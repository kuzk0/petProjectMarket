import { Grid, GridItem, useDisclosure } from "@chakra-ui/react";

import { FilterMenu } from "../ui/filterMenu";
import { AsideFilters } from "../ui/asideFilters";
import { IProduct } from "../../consts";

import { RootState } from "../../store";
import { ModalProduct } from "../modals/modalProduct";
import { useSelector } from "react-redux";
import { getProducts } from "../../utils/db";
import { FC, useEffect, useState } from "react";
import { ProductList } from "../ui/productList";
import { Pagination } from "../ui/pagination";

export const Products: FC = () => {
  const filterPriceValues = useSelector((state: RootState) => state.filterPrice.default);
  const sortType = useSelector((state: RootState) => state.sort.sortID);

  const { isOpen: isOpenModalProduct, onOpen: onOpenModalProduct, onClose: onCloseModalProduct } = useDisclosure();

  const [productsState, setProductsOutput] = useState<{ productsOutput: IProduct[]; isLoadedProducts: boolean }>({
    productsOutput: [],
    isLoadedProducts: false,
  });

  let maxPriceProduct: number = 0;
  let minPriceProduct: number = 0;

  const page = useSelector((state: RootState) => state.pagination.productCurrentPage) - 1;
  const sortBy = useSelector((state: RootState) => state.pagination.productSortBy);

  const countPages = Math.ceil(productsState.productsOutput.length / sortBy);

  useEffect(() => {
    setProductsOutput({ productsOutput: [], isLoadedProducts: false });
    getProducts({ min: filterPriceValues[0], max: filterPriceValues[1], page: 1, sortType: sortType, sortBy: 10 }).then((snapshot) => {
      if (snapshot.exists()) {
        const productListDb: IProduct[] = [];
        snapshot.forEach((element) => {
          if (element.exists()) productListDb.push(element.val());
        });

        if (productListDb.length) {
          const arrPrice: number[] = productListDb?.map((product) => product.price).filter((price) => !Number.isNaN(price));

          // eslint-disable-next-line react-hooks/exhaustive-deps
          minPriceProduct = Math.min.apply(null, arrPrice);
          // eslint-disable-next-line react-hooks/exhaustive-deps
          maxPriceProduct = Math.max.apply(null, arrPrice);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps

        setProductsOutput({ productsOutput: productListDb, isLoadedProducts: true });
      } else {
        setProductsOutput({ productsOutput: [], isLoadedProducts: true });
      }
    });
  }, [filterPriceValues, sortType, minPriceProduct, maxPriceProduct]);

  return (
    <Grid
      gap={6}
      templateAreas={{
        base: `"header"
              "main"
              "footer"`,

        md: `"header header"
              "nav main"
              "nav footer"`,
      }}
      gridTemplateColumns={{ base: "100%", md: "250px 1fr" }}
      gridTemplateRows={{ base: "50px 1fr 100px", md: "auto" }}
      w="100%"
    >
      <GridItem area="header">
        <AsideFilters>
          <FilterMenu minPriceProduct={filterPriceValues[0]} maxPriceProduct={filterPriceValues[1]} />
        </AsideFilters>
      </GridItem>
      <GridItem area="nav" display={{ base: "none", md: "block" }}>
        <FilterMenu minPriceProduct={filterPriceValues[0]} maxPriceProduct={filterPriceValues[1]} />
      </GridItem>
      <GridItem area="main">
        <ProductList products={productsState.productsOutput} onOpenModalProduct={onOpenModalProduct} isLoaded={productsState.isLoadedProducts} />
      </GridItem>
      <GridItem w="100%" area="footer">
        <Pagination page={page} sortBy={sortBy} countPages={countPages} list="products"></Pagination>
      </GridItem>
      <ModalProduct isOpenModalProduct={isOpenModalProduct} onCloseModalProduct={onCloseModalProduct} />
    </Grid>
  );
};
