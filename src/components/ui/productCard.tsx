import { FC, useEffect, useState } from "react";
import {
  Box,
  Image,
  Heading,
  Stack,
  Text,
  Skeleton,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Icon,
  Badge,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import { BiShoppingBag } from "react-icons/bi";
import { IProductCard } from "../../consts";
import { RatingProductStar } from "./ratingProductStar";
import { useDispatch } from "react-redux";
import { addItem } from "../../store/slices/cartSlice";
import { set } from "../../store/slices/currentProductInModalSlice";
import { Link, useParams } from "react-router-dom";

export const ProductCard: FC<IProductCard> = (props) => {
  const { product, inModal, onOpenModalProduct } = props;

  const [isLoaded, setIsLoaded] = useState(false);

  const { productId } = useParams();

  const dispatch = useDispatch();

  const addCartItemHandle = () => dispatch(addItem(product));

  const onOpenModalProductHandle = () => {
    if (!inModal) {
      dispatch(set(product));
    }
  };

  const setIsLoadedTrue = () => setIsLoaded(true);

  useEffect(() => {
    if (Number(productId) === product.id && !inModal) {
      onOpenModalProduct();
      dispatch(set(product));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, productId]);

  return (
    <LinkBox as="article">
      <Card maxW={inModal ? "100%" : { base: "100%", sm: "300px", md: "100%", lg: "300px" }} shadow="2xl">
        <CardBody onClick={onOpenModalProductHandle} cursor={inModal ? "auto" : "pointer"}>
          <Box h="300px">
            <Skeleton h="inherit" m="0 auto" maxH="100%" isLoaded={isLoaded} display="flex" flexDir="column" justifyContent="center" borderRadius="lg">
              <Image src={product.image} alt={product.title} maxH="100%" m="0 auto" borderRadius="lg" onLoad={setIsLoadedTrue} />
            </Skeleton>
          </Box>
          <Stack mt="6" spacing="3">
            <Text size="sm" noOfLines={2}>
              <Badge variant="outline" colorScheme="green">
                {product.category}
              </Badge>
            </Text>
            <RatingProductStar productRating={product.rating} />
            {!inModal && (
              <LinkOverlay as={Link} to={product.id.toString()}>
                <Heading size="md" title={product.title} noOfLines={inModal ? 30 : 1}>
                  {product.title}
                </Heading>
              </LinkOverlay>
            )}
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
            <Button variant="solid" colorScheme="blue" onClick={addCartItemHandle}>
              В корзину
              <Icon ml={2} as={BiShoppingBag} />
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </LinkBox>
  );
};
