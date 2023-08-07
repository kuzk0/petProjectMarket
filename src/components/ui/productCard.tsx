import { useState } from "react";
import { Box, Image, Heading, Stack, Text, Skeleton, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Icon, Badge, useToast } from "@chakra-ui/react";
import { BiShoppingBag } from "react-icons/bi";
import { IProduct } from "../../consts";
import { RatingProductStar } from "./ratingProductStar";
import { useDispatch } from "react-redux";
import { addItem } from "../../store/slices/cartSlice";
import { set } from "../../store/slices/currentProductInModalSlice";

export const ProductCard = (props: any) => {
  const product: IProduct = props.product;
  const inModal = props.inModal || false;
  const [isLoaded, setIsLoaded] = useState(false);

  const onOpenModalProduct = props.onOpenModalProduct;

  const dispatch = useDispatch();

  const addCartItemHandle = (product: IProduct) => {
    dispatch(addItem(product));
  };
  const onOpenModalProductHandle = () => {
    if (!inModal) {
      dispatch(set(product));
      onOpenModalProduct();
    }
  };

  return (
    <Card maxW="sm" maxWidth={inModal ? "100%" : { base: "100%", sm: "300px", md: "100%", lg: "300px" }} shadow="2xl">
      <CardBody onClick={onOpenModalProductHandle} cursor={inModal ? "auto" : "pointer"}>
        <Box h="300px">
          <Skeleton h="inherit" m="0 auto" maxH="100%" isLoaded={isLoaded} display="flex" flexDir="column" justifyContent="center" borderRadius="lg">
            <Image src={product.image} alt={product.title} maxH="100%" m="0 auto" borderRadius="lg" onLoad={() => setIsLoaded(true)} />
          </Skeleton>
        </Box>
        <Stack mt="6" spacing="3">
          <Text size="sm" noOfLines={2}>
            <Badge variant="outline" colorScheme="green">
              {product.category}
            </Badge>
          </Text>
          <RatingProductStar productRating={product.rating} />
          <Heading size="md" title={product.title} noOfLines={inModal ? 30 : 1}>
            {product.title}
          </Heading>
          <Text title={product.description} noOfLines={inModal ? 30 : 1}>
            {product.description}
          </Text>
          <Text color="WindowText" fontSize="2xl">
            {product.price}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2" w="100%" justifyContent="center">
          <Button variant="solid" colorScheme="blue" onClick={() => addCartItemHandle(product)}>
            В корзину
            <Icon ml={2} as={BiShoppingBag} />
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};
