import { Tr, Td, LinkOverlay } from "@chakra-ui/react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { IOrderCard } from "../../consts";

export const OrderCard: FC<IOrderCard> = (props) => {
  const { order, setModalOrder, onOpenModalOrder } = props;
  const modalOrderOpenHandle = () => {
    setModalOrder(order);
    onOpenModalOrder();
  };

  return (
    <Tr onClick={modalOrderOpenHandle}>
      <Td>
        <LinkOverlay as={Link} to={order.userId_dateTime}>
          {order.status}
        </LinkOverlay>
      </Td>
      <Td>{new Date(order.dateTime).toDateString()}</Td>
      <Td textAlign="center">{order.paymentForm}</Td>
      <Td textAlign="center">{order.amount}</Td>
    </Tr>
  );
};
