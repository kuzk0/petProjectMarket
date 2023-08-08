import { FC, useEffect, useState } from "react";
import { LinkBox, LinkOverlay, Spinner, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { IOrder, IOrderList } from "../../consts";
import ModalOrder from "../modals/modalOrder";
import { Link, useParams } from "react-router-dom";

const OrdersList: FC<IOrderList> = (props) => {
  const propsOrders = props.orders;

  const { isOpenModalOrder, onOpenModalOrder, onCloseModalOrder, isLoaded } = props;
  const [modalOrder, setModalOrder] = useState<IOrder>({
    status: "",
    items: [],
    dateTime: 0,
    paymentForm: "",
    amount: 0,
    userId: "",
    userId_dateTime: "",
  });
  const { orderId } = useParams();
  //   const page = 0;
  //   const sortBy = 10;
  //   const startSlice = page * sortBy;
  //   const endSclice = startSlice + sortBy;

  const filtredOrders = propsOrders; //.slice(startSlice, endSclice);
  const modalOrderHandle = (order: IOrder) => {
    setModalOrder(order);
    onOpenModalOrder();
  };

  useEffect(() => {
    if (isLoaded && filtredOrders.length) {
      filtredOrders.forEach((order: IOrder) => {
        if (orderId === order.userId_dateTime) {
          setModalOrder(order);
          onOpenModalOrder();
        }
      });
    }
  }, [onOpenModalOrder, orderId, modalOrder, isLoaded, filtredOrders]);
  return (
    <LinkBox as="article">
      <TableContainer>
        <Table size="md" variant="striped" colorScheme="blackAlpha">
          <Thead>
            <Tr>
              <Th textAlign="center">Статус</Th>
              <Th textAlign="center">Дата</Th>
              <Th textAlign="center">Форма оплаты</Th>
              <Th textAlign="center">Итого</Th>
            </Tr>
          </Thead>

          <Tbody>
            {isLoaded ? (
              filtredOrders.length ? (
                filtredOrders.map((order: IOrder) => (
                  <Tr key={order.userId_dateTime} onClick={() => modalOrderHandle(order)}>
                    <Td>
                      {" "}
                      <LinkOverlay as={Link} to={order.userId_dateTime}>
                        {order.status}
                      </LinkOverlay>
                    </Td>
                    <Td>{new Date(order.dateTime).toDateString()}</Td>
                    <Td textAlign="center">{order.paymentForm}</Td>
                    <Td textAlign="center">{order.amount}</Td>
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
    </LinkBox>
  );
};
export default OrdersList;
