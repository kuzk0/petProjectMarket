import { Button, Skeleton, Box, Heading, Stack, Text, Flex, Image, NumberInput, NumberInputField } from "@chakra-ui/react";
import { useRef, useState } from "react";

import { ICartItem } from "../../consts";
import { useDispatch } from "react-redux";
import { changeCount, deleteItem } from "../../store/slices/cartSlice";

export const CartItem = ({ item }: { item: ICartItem }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const refInput = useRef(null);

  const dispatch = useDispatch();

  const changeCountClick = (changedCountItem: number) => {
    if (changedCountItem <= 0) dispatch(deleteItem(item.product));
    else {
      dispatch(changeCount({ product: item.product, count: changedCountItem }));
    }
  };

  return (
    <Flex w="100%" h="100px" my="30px" borderBottom="1px solid grey" alignItems="center" pos="relative">
      <Box>
        <Skeleton
          h="inherit"
          m="0 auto"
          maxH="100%"
          w="75px"
          pr="20px"
          isLoaded={isLoaded}
          display={{ base: "none", md: "flex" }}
          flexDir="column"
          justifyContent="center"
          borderRadius="lg"
        >
          <Image src={item.product.image} alt={item.product.title} maxH="100%" m="0 auto" borderRadius="lg" onLoad={() => setIsLoaded(true)} />
        </Skeleton>
      </Box>
      <Stack maxW="80%">
        <Heading size="md" title={item.product.title} noOfLines={1}>
          {item.product.title}
        </Heading>
        <Text title={item.product.description} fontSize="sm" noOfLines={1}>
          {item.product.description}
        </Text>
      </Stack>
      <Flex minW="100px" h="100%" flexDir="column" alignItems="center" justifyContent="space-between">
        <Text title={item.product.price + "₽"} colorScheme="gray" fontSize="lg">
          {item.product.price * item.count} ₽
        </Text>

        <Flex w="100%" justifyContent="space-between" alignItems="center">
          <Button textColor="blue.300" size="sm" onClick={() => changeCountClick(item.count - 1)}>
            -
          </Button>

          <NumberInput value={item.count} size="sm" defaultValue={1} min={0}>
            <NumberInputField padding={0} textAlign="center" border={0} ref={refInput} onChange={(e) => changeCountClick(+e.target.value || 1)} />
          </NumberInput>
          <Button textColor="blue.300" size="sm" onClick={() => changeCountClick(item.count + 1)}>
            +
          </Button>
        </Flex>
        <Text title={item.product.price + "₽"} colorScheme="gray" fontSize="sm">
          {item.count}x{item.product.price} ₽
        </Text>
      </Flex>
      <Button textColor="blue.300" pos="absolute" right="110px" top="0px" size="sm" onClick={() => dispatch(deleteItem(item.product))}>
        Удалить
      </Button>
    </Flex>
  );
};
