import {
  Flex,
  Button,
  Link as LinkUI,
  useColorModeValue,
  useColorMode,
  Text,
  ButtonGroup,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useToast,
} from "@chakra-ui/react";

import { useState } from "react";

import { Link } from "react-router-dom";
import { PATH } from "../../consts";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { BiLogInCircle, BiShoppingBag, BiLogOutCircle } from "react-icons/bi";
import { BsPersonAdd } from "react-icons/bs";
import { FaUserLarge } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";
import { RiFileList3Line } from "react-icons/ri";

import { signOutUser } from "../../utils/db";
import { signOut } from "../../store/slices/userSlice";

export const Nav = (props: any) => {
  const { onOpenModalCart, onOpenModalLogin, onOpenModalCreateAccount } = props;
  const Icon = useColorModeValue(MoonIcon, SunIcon);
  const { toggleColorMode } = useColorMode();

  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const countCartItem = useSelector((state: RootState) => state.cart.countCartItem);
  const loginUser = useSelector((state: RootState) => state.loginUser);
  const dispatch = useDispatch();

  const toast = useToast();

  const signOutHandle = () => {
    setIsLoadingButton(true);
    signOutUser()
      .then(() => {
        dispatch(signOut());
        setIsLoadingButton(false);
      })
      .catch((error) => {
        console.log(error);

        toast({
          title: <Text>{error.message || "Ошибка"}</Text>,
          position: "top-right",
          status: "error",
          isClosable: true,
        });
      });
  };
  return (
    <Flex align="center" justify={["center", "center", "flex-end", "flex-end"]} direction={["column", "column", "row", "row"]} pt={[4, 0, 0, 0]}>
      {/* TODO: map links */}
      <LinkUI as={Link} mb={{ base: 8, md: 0 }} mr={{ base: 0, md: 8 }} to={PATH.MAIN}>
        Главная
      </LinkUI>
      <LinkUI as={Link} mb={{ base: 8, md: 0 }} mr={{ base: 0, md: 8 }} to={PATH.PRODUCTS}>
        Товары
      </LinkUI>

      <Button
        mb={{ base: 8, md: 0 }}
        mr={{ base: 0, md: 8 }}
        size="md"
        rounded="md"
        aria-label={`Open cart modal`}
        ml={{ base: 0, md: 3 }}
        pos="relative"
        onClick={onOpenModalCart}
      >
        {countCartItem > 0 && (
          <Flex
            justifyContent=" center"
            alignItems=" center"
            bg="blue.400"
            pos="absolute"
            opacity="0.8"
            top="-7px"
            right="-7px"
            w="20px"
            h="20px"
            rounded="full"
          >
            <Text color="floralwhite" fontSize="xs">
              {countCartItem}
            </Text>
          </Flex>
        )}
        <Icon as={BiShoppingBag} />
      </Button>
      <Button
        mb={{ base: 8, md: 0 }}
        mr={{ base: 0, md: 8 }}
        size="md"
        rounded="md"
        aria-label={`Switcher mode`}
        ml={{ base: 0, md: 3 }}
        onClick={toggleColorMode}
      >
        <Icon />
      </Button>
      {!loginUser.auth ? (
        <ButtonGroup size="md" isAttached variant="outline">
          <IconButton rounded="md" aria-label="Create account" onClick={onOpenModalCreateAccount} icon={<BsPersonAdd />} />
          <IconButton rounded="md" aria-label="Login account" onClick={onOpenModalLogin} icon={<BiLogInCircle />} />
        </ButtonGroup>
      ) : (
        <Menu>
          <MenuButton as={Button} rightIcon={<Icon as={FaUserLarge} />}>
            {loginUser.name || "username"}
          </MenuButton>
          <MenuList>
            <MenuItem as={Link} to={PATH.ORDERS} textAlign="center" minH="48px" icon={<RiFileList3Line size="24px" />} alignContent="center">
              Заказы
            </MenuItem>

            <MenuItem as={Link} to={PATH.USER} textAlign="center" icon={<FaUserEdit size="24px" />} minH="40px">
              Аккаунт
            </MenuItem>
            <MenuItem
              as={Button}
              textAlign="center"
              isLoading={isLoadingButton}
              icon={<BiLogOutCircle size="24px" />}
              minH="40px"
              bgColor="red.200"
              colorScheme="red"
              onClick={signOutHandle}
            >
              Выйти
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </Flex>
  );
};
