import { FC } from "react";
import { Flex } from "@chakra-ui/react";
import { Main } from "../sections/main";

const MainPageLayout: FC = () => {
  return (
    <Flex direction="column" align="center" maxW={{ xl: "1280px" }} m="0 auto">
      <Main />

      {/* <Footer /> */}
    </Flex>
  );
};

export default MainPageLayout;
