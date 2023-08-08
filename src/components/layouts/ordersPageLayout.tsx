import { FC } from "react";
import { Flex } from "@chakra-ui/react";

import { Orders } from "../sections/orders";

const OrdersPageLayout: FC = () => {
  return (
    <Flex direction="column" align="center" maxW={{ xl: "1280px" }} m="0 auto">
      {/* <Header /> */}
      <Orders />
      {/* <Footer /> */}
    </Flex>
  );
};
export default OrdersPageLayout;
