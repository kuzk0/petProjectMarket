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
import { IOrder } from "../../consts";
import { Fragment } from "react";

const ModalOrder = (props: any) => {
  const { isOpenModalOrder, onCloseModalOrder, order }: { isOpenModalOrder: boolean; onCloseModalOrder: () => void; order: IOrder } = props;

  return (
    <Drawer isOpen={isOpenModalOrder} placement="right" size="lg" onClose={onCloseModalOrder}>
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
          <Button variant="outline" mr={3} onClick={onCloseModalOrder}>
            Закрыть
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
export default ModalOrder;
