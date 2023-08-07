import { useState } from "react";
import { Button, Spinner, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { IOrder } from "../../consts";
import ModalOrder from "./modalOrder";

const OrdersList = (props: any) => {
  const propsOrders = props.orders;

  const { isOpenModalOrder, onOpenModalOrder, onCloseModalOrder } = props;
  const [modalOrder, setModalOrder] = useState<IOrder>({
    status: "",
    items: [],
    dateTime: 0,
    paymentForm: "",
    amount: 0,
    userId: "",
    userId_dateTime: "",
  });
  //   const page = 0;
  //   const sortBy = 10;
  //   const startSlice = page * sortBy;
  //   const endSclice = startSlice + sortBy;

  const filtredOrders: Array<IOrder> = propsOrders; //.slice(startSlice, endSclice);
  const modalOrderHandle = (order: IOrder) => {
    setModalOrder(order);
    onOpenModalOrder();
  };
  return (
    <>
      <TableContainer>
        <Table size="sm" variant="striped" colorScheme="blackAlpha">
          <Thead>
            <Tr>
              <Th textAlign="center">Статус</Th>
              <Th textAlign="center">Дата</Th>
              <Th textAlign="center">Форма оплаты</Th>
              <Th textAlign="center">Итого</Th>
            </Tr>
          </Thead>

          <Tbody>
            {props.isLoaded ? (
              filtredOrders.length ? (
                filtredOrders.map((order: IOrder) => (
                  <Tr key={order.userId_dateTime}>
                    <Td>{order.status}</Td>
                    <Td>{new Date(order.dateTime).toDateString()}</Td>
                    <Td textAlign="center">{order.paymentForm}</Td>
                    <Td textAlign="center">{order.amount}</Td>

                    <Td textAlign="center">
                      <Button variant="ghost" onClick={() => modalOrderHandle(order)} as="span" flex="1" textAlign="left">
                        Товары
                      </Button>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td textAlign="center" colSpan={4}>
                    Заказы не найдены
                  </Td>
                </Tr>
              )
            ) : (
              <Tr>
                <Td textAlign="center" colSpan={4}>
                  <Spinner as={Text} thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>

      <ModalOrder isOpenModalOrder={isOpenModalOrder} onCloseModalOrder={onCloseModalOrder} order={modalOrder} />
    </>
  );
};
export default OrdersList;
