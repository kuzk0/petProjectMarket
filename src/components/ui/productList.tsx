import { Spinner, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { IProduct } from "../../consts";
import { RootState } from "../../store";
import { ProductCard } from "./productCard";

export const ProductList = (props: any) => {
  const propsProducts = props.products;

  const { onOpenModalProduct } = props;
  const filterPriceValues = useSelector((state: RootState) => state.filterPrice.default);
  const sortType = useSelector((state: RootState) => state.sort.sortID);

  const page = 0;
  const sortBy = 10;
  const startSlice = page * sortBy;
  const endSclice = startSlice + sortBy;

  const filtredProducts: Array<IProduct> = propsProducts
    .filter((value: IProduct) => value.price >= filterPriceValues[0] && value.price <= filterPriceValues[1])
    .sort((a: IProduct, b: IProduct) => {
      switch (sortType) {
        case 0:
          return b.rating.count - a.rating.count;
        case 1:
          return a.price - b.price;
        case 2:
          return b.price - a.price;
        case 3:
          return b.rating.rate - a.rating.rate;
      }
      //Очень важный return 0, иначе не может отсортировать и ошибка идет на  уровне IDE (number|undefinded)
      return 0;
    })
    .slice(startSlice, endSclice);

  return (
    <>
      {props.isLoaded ? (
        filtredProducts.length ? (
          filtredProducts.map((product: IProduct) => <ProductCard onOpenModalProduct={onOpenModalProduct} key={product.id} product={product} />)
        ) : (
          <Text>Ничего не найдено</Text>
        )
      ) : (
        <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
      )}
    </>
  );
};
