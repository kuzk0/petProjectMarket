import { FC } from "react";
import { Box, Flex, Spinner, Text, useDisclosure } from "@chakra-ui/react";

import { IOrder } from "../../consts";

import { getOrders } from "../../utils/db";
import { useEffect, useState } from "react";
import OrdersList from "../ui/ordersList";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const Orders: FC = () => {
  const { isOpen: isOpenModalOrder, onOpen: onOpenModalOrder, onClose: onCloseModalOrder } = useDisclosure();
  const currentUser = useSelector((state: RootState) => state.loginUser);
  const [ordersState, setOrdersOutput] = useState<{ ordersOutput: IOrder[]; isLoadedOrders: boolean }>({
    ordersOutput: [],
    isLoadedOrders: false,
  });

  useEffect(() => {
    if (currentUser.auth)
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
  }, [currentUser]);

  return (
    <Flex rounded="2xl" gap={10} flexWrap="wrap" justifyContent="space-evenly">
      {ordersState.isLoadedOrders ? (
        <OrdersList
          orders={ordersState.ordersOutput}
          isOpenModalOrder={isOpenModalOrder}
          onOpenModalOrder={onOpenModalOrder}
          onCloseModalOrder={onCloseModalOrder}
        />
      ) : (
        <Box textAlign="center">
          <Spinner as={Text} thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        </Box>
      )}
    </Flex>
  );
};
