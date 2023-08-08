import { FC } from "react";
import { Flex, useDisclosure } from "@chakra-ui/react";

import { IOrder, PATH } from "../../consts";

import { getOrders } from "../../utils/db";
import { useEffect, useState } from "react";
import OrdersList from "../ui/ordersList";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router";

export const Orders: FC = () => {
  const { isOpen: isOpenModalOrder, onOpen: onOpenModalOrder, onClose: onCloseModalOrder } = useDisclosure();
  const [ordersState, setOrdersOutput] = useState<{ ordersOutput: IOrder[]; isLoadedOrders: boolean }>({
    ordersOutput: [],
    isLoadedOrders: false,
  });
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getOrders().then((snapshot) => {
          if (snapshot.exists()) {
            const productListDb: IOrder[] = [];
            snapshot.forEach((element) => {
              if (element.exists()) productListDb.push(element.val());
            });
            setOrdersOutput({
              ordersOutput: productListDb,
              isLoadedOrders: true,
            });
          } else {
            setOrdersOutput({
              ordersOutput: [],
              isLoadedOrders: true,
            });
          }
        });
      } else navigate(PATH.MAIN);
    });
  }, [navigate]);

  return (
    <Flex rounded="2xl" gap={10} flexWrap="wrap" justifyContent="space-evenly">
      <OrdersList
        orders={ordersState.ordersOutput}
        isOpenModalOrder={isOpenModalOrder}
        onOpenModalOrder={onOpenModalOrder}
        onCloseModalOrder={onCloseModalOrder}
        isLoaded={ordersState.isLoadedOrders}
      />
    </Flex>
  );
};
