import { FC, useEffect, useState } from "react";
import { LinkBox, Table, TableContainer, Tbody, Td, Box, Th, Thead, Tr } from "@chakra-ui/react";
import { IOrder, IOrderList } from "../../consts";
import ModalOrder from "../modals/modalOrder";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Pagination } from "./pagination";
import { OrderCard } from "./orderCard";

const OrdersList: FC<IOrderList> = (props) => {
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
  const { orderId } = useParams();

  const page = useSelector((state: RootState) => state.pagination.orderCurrentPage) - 1;
  const sortBy = useSelector((state: RootState) => state.pagination.orderSortBy);
  const countPages = Math.ceil(propsOrders.length / sortBy);
  const startSlice = page * sortBy;
  const endSclice = startSlice + sortBy;
  const filtredOrders = propsOrders.slice(startSlice, endSclice);

  useEffect(() => {
    if (filtredOrders.length) {
      filtredOrders.forEach((order: IOrder) => {
        if (orderId === order.userId_dateTime) {
          setModalOrder(order);
          onOpenModalOrder();
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId, modalOrder, filtredOrders]);
  return (
    <Box>
      <LinkBox as="article" mb={30}>
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
              {filtredOrders.length ? (
                filtredOrders.map((order: IOrder) => (
                  <OrderCard key={order.userId_dateTime} order={order} setModalOrder={setModalOrder} onOpenModalOrder={onOpenModalOrder} />
                ))
              ) : (
                <Tr>
                  <Td textAlign="center" colSpan={4}>
                    Заказы не найдены
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </TableContainer>

        <ModalOrder isOpenModalOrder={isOpenModalOrder} onCloseModalOrder={onCloseModalOrder} order={modalOrder} />
      </LinkBox>
      <Pagination page={page} sortBy={sortBy} countPages={countPages} list="orders"></Pagination>
    </Box>
  );
};
export default OrdersList;
