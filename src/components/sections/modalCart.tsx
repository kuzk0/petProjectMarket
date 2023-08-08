import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Text,
  useToast,
  UseToastOptions,
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { CartItem } from "../ui/cartItem";
import { createOrder } from "../../utils/db";
import { FC, useState } from "react";
import { auth } from "../../firebase";
import { IModalCart, IOrder } from "../../consts";
import { clearCart } from "../../store/slices/cartSlice";

export const ModalCart: FC<IModalCart> = (props) => {
  const { isOpenModalCart, onCloseModalCart } = props;
  const toast = useToast();

  const cart = useSelector((state: RootState) => state.cart.cartList);
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const dispatch = useDispatch();

  const createOrderhandle = () => {
    setIsLoadingButton(true);
    if (auth.currentUser) {
      const userId = auth.currentUser.uid;
      const dateTime = new Date().getTime();
      const order: IOrder = {
        status: "Создан",
        items: cart,
        dateTime: dateTime,
        paymentForm: "Онлайн банкинг",
        amount: cart.reduce((summ, item) => {
          return summ + item.product.price * item.count;
        }, 0),
        userId: userId,
        userId_dateTime: `${dateTime}_${userId}`,
      };

      createOrder(order).then((result) => {
        toast({
          title: <Text>{result.data || "Ошибка"}</Text>,
          position: result.type === "success" ? "top-left" : "top-right",
          status: result.type as UseToastOptions["status"],
          isClosable: true,
        });
        if (result.type === "success") {
          dispatch(clearCart());
        }
        setIsLoadingButton(false);
        onCloseModalCart();
      });
    } else {
      toast({
        title: <Text>{"Войдите в аккаунт"}</Text>,
        position: "top-right",
        status: "error",
        isClosable: true,
      });
    }

    setIsLoadingButton(false);
    onCloseModalCart();
  };

  return (
    <Box>
      <Modal isOpen={isOpenModalCart} onClose={onCloseModalCart} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Корзина товаров</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6} maxH="70vh" overflow="overlay">
            {cart.length ? cart.map((cartItem) => <CartItem item={cartItem} key={cartItem.product.id} />) : <Text>Корзина пуста</Text>}
          </ModalBody>

          <ModalFooter>
            {cart.length > 0 && (
              <Button colorScheme="blue" mr={3} onClick={createOrderhandle} isLoading={isLoadingButton}>
                Купить
              </Button>
            )}
            <Button onClick={onCloseModalCart}>Закрыть</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
