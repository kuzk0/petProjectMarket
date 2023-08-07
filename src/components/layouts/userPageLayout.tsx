import { FC } from "react";
import { Flex } from "@chakra-ui/react";
import { UserAccount } from "../sections/userAccount";

const UserPageLayout: FC = () => {
  return (
    <Flex direction="column" align="center" maxW={{ xl: "1280px" }} m="0 auto">
      <UserAccount />

      {/* <Footer /> */}
    </Flex>
  );
};

export default UserPageLayout;
