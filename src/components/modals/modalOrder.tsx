import {
  Button,
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
} from "@chakra-ui/react";
import { IModalOrder, PATH } from "../../consts";
import { FC, Fragment } from "react";
import { useNavigate } from "react-router-dom";

const ModalOrder: FC<IModalOrder> = (props) => {
  const { isOpenModalOrder, onCloseModalOrder, order } = props;
  const navigate = useNavigate();

  const onCloseModalOrderHandle = () => {
    onCloseModalOrder();
    navigate(PATH.ORDERS);
  };
  return (
    <Drawer isOpen={isOpenModalOrder} placement="right" size="lg" onClose={onCloseModalOrderHandle}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>Товары</DrawerHeader>

        <DrawerBody>
          <TableContainer>
            <Table size="sm" variant="striped" colorScheme="gray">
              <Thead>
                <Tr>
                  <Th>Название товара</Th>
                  <Th textAlign="center">Количество</Th>
                  <Th textAlign="center">Цена</Th>
                  <Th textAlign="center">Сумма</Th>
                </Tr>
              </Thead>
              <Tbody>
                {order.items.map((item) => (
                  <Fragment key={item.product.id}>
                    <Tr>
                      <Td colSpan={4} w="100%">
                        <Box whiteSpace="pre-wrap">{item.product.title}</Box>
                      </Td>
                    </Tr>
                    <Tr>
                      <Td />
                      <Td textAlign="center">x {item.count}</Td>
                      <Td textAlign="center">
                        {item.product.price} x {item.count}
                      </Td>
                      <Td textAlign="center"> {item.product.price * item.count}</Td>
                    </Tr>
                  </Fragment>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </DrawerBody>

        <DrawerFooter justifyContent="space-between">
          <Text mr={3}>Итого: {order.amount}</Text>
          <Button variant="outline" mr={3} onClick={onCloseModalOrderHandle}>
            Закрыть
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
export default ModalOrder;
