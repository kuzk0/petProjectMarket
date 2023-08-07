import { FC, useState } from "react";
import { Box, Flex, Button, Collapse, useDisclosure } from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { ModalLogin } from "./modalLogin";
import { ModalCart } from "./modalCart";
import { Nav } from "../ui/nav";
import { ModalCreateAccount } from "./modalCreateAccount";

export const Header: FC = (props: any) => {
  const { isOpen: isOpenModalLogin, onOpen: onOpenModalLogin, onClose: onCloseModalLogin } = useDisclosure();
  const { isOpen: isOpenModalCart, onOpen: onOpenModalCart, onClose: onCloseModalCart } = useDisclosure();
  const { isOpen: isOpenModalCreateAccount, onOpen: onOpenModalCreateAccount, onClose: onCloseModalCreateAccount } = useDisclosure();
  const [show, setShow] = useState(false);
  const toggleMenu = () => setShow(!show);

  return (
    <Flex as="nav" align="center" justify="flex-end" wrap="wrap" w="100%" mb={8} p={8} {...props}>
      <Button display={{ base: "block", md: "none" }} onClick={toggleMenu}>
        {show ? <CloseIcon /> : <HamburgerIcon />}
      </Button>
      <Box display={{ base: "none", md: "block" }} flexBasis={{ base: "100%", md: "auto" }}>
        <Nav onOpenModalLogin={onOpenModalLogin} onOpenModalCart={onOpenModalCart} onOpenModalCreateAccount={onOpenModalCreateAccount} />
      </Box>

      <Box display={{ base: "block", md: "none" }} flexBasis={{ base: "100%", md: "auto" }}>
        <Collapse in={show} animateOpacity>
          <Nav onOpenModalLogin={onOpenModalLogin} onOpenModalCart={onOpenModalCart} onOpenModalCreateAccount={onOpenModalCreateAccount} />
        </Collapse>
      </Box>
      <ModalCreateAccount isOpenModalCreateAccount={isOpenModalCreateAccount} onCloseModalCreateAccount={onCloseModalCreateAccount} />
      <ModalLogin isOpenModalLogin={isOpenModalLogin} onCloseModalLogin={onCloseModalLogin} />
      <ModalCart isOpenModalCart={isOpenModalCart} onCloseModalCart={onCloseModalCart} />
    </Flex>
  );
};
