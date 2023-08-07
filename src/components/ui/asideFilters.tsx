import {
  useDisclosure,
  Flex,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Box,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { BsFilterSquare } from "react-icons/bs";
import SortMenu from "./sortMenu";

export const AsideFilters = (props: any) => {
  const [showAside, setShow] = useState(true);

  const { isOpen: isOpenAsideFilters, onOpen: onOpenAsideFilters, onClose: onCloseAsideFilters } = useDisclosure();

  const toggleMenu = () => {
    onOpenAsideFilters();
    setShow(!showAside);
    // console.log(ref);
  };

  const btnRef = useRef(null);

  return (
    <Flex h={50} w="100%" bg="transparent" p="5px 10px" justifyContent="flex-end" gap={6}>
      <Button display={{ base: "block", md: "none" }} ref={btnRef} onClick={toggleMenu}>
        <BsFilterSquare />
      </Button>
      <Drawer isOpen={isOpenAsideFilters} placement="right" onClose={onCloseAsideFilters} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Фильтр товаров</DrawerHeader>

          <DrawerBody>
            <Box zIndex={10} id="1">
              {props.children}
            </Box>
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
      <SortMenu />
    </Flex>
  );
};
