import { FC } from "react";
import { Flex } from "@chakra-ui/react";
import { Products } from "../sections/products";

const ProductsPageLayout: FC = () => {
  return (
    <Flex direction="column" align="center" maxW={{ xl: "1280px" }} m="0 auto">
      <Products />

      {/* <Footer /> */}
    </Flex>
  );
};

export default ProductsPageLayout;
