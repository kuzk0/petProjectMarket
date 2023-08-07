import { Grid, GridItem, Flex, useDisclosure } from "@chakra-ui/react";

import { FilterMenu } from "../ui/filterMenu";
import { AsideFilters } from "../ui/asideFilters";
import { IProduct } from "../../consts";

import { RootState } from "../../store";
import { ModalProduct } from "./modalProduct";
import { useSelector } from "react-redux";
import { getProducts } from "../../utils/db";
import { useEffect, useState } from "react";
import { ProductList } from "../ui/productList";

export const Products = () => {
  const filterPriceValues = useSelector((state: RootState) => state.filterPrice.default);
  const sortType = useSelector((state: RootState) => state.sort.sortID);

  const { isOpen: isOpenModalProduct, onOpen: onOpenModalProduct, onClose: onCloseModalProduct } = useDisclosure();

  const [productsState, setProductsOutput] = useState<{ productsOutput: IProduct[]; isLoadedProducts: boolean }>({
    productsOutput: [],
    isLoadedProducts: false,
  });

  let maxPriceProduct: number = 0;
  let minPriceProduct: number = 0;

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
        <Flex rounded="2xl" gap={10} flexWrap="wrap" justifyContent="space-evenly">
          <ProductList products={productsState.productsOutput} onOpenModalProduct={onOpenModalProduct} isLoaded={productsState.isLoadedProducts} />
        </Flex>
      </GridItem>
      <GridItem w="100%" h={50} bg="gray" area="footer"></GridItem>
      <ModalProduct isOpenModalProduct={isOpenModalProduct} onCloseModalProduct={onCloseModalProduct} />
    </Grid>
  );
};
//TODO: delete
// const defaultProducts: IProduct[] = [
//   {
//     id: 212,
//     category: "men's clothing",
//     description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//     image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//     price: 609.95,
//     rating: {
//       count: 120,
//       rate: 3.9,
//     },
//     title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//   },
//   {
//     id: 122,
//     category: "men's clothing",
//     description:
//       "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
//     image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
//     price: 22.3,
//     rating: {
//       count: 259,
//       rate: 4.1,
//     },
//     title: "Mens Casual Premium Slim Fit T-Shirts",
//   },
//   {
//     id: 16,
//     category: "electronics",
//     description:
//       "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)",
//     image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
//     price: 1009,
//     rating: {
//       count: 470,
//       rate: 2.9,
//     },
//     title: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
//   },
//   {
//     id: 14,
//     category: "electronics",
//     description:
//       "Eaeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)",
//     image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
//     price: 11111,
//     rating: {
//       count: 470,
//       rate: 2.9,
//     },
//     title: "Sssssssssssssssssssssssssssssssss",
//   },
// ];
