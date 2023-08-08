import { FC } from "react";
import { Box, Card, CardBody, CardHeader, Text, Heading, Stack, StackDivider } from "@chakra-ui/react";
import { PATH } from "../../consts";
import { Link } from "react-router-dom";

export const Main: FC = () => {
  return (
    <Card >
      <CardHeader>
        <Heading size="md">Пет-проект магазина</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box as={Link} to={PATH.PRODUCTS}>
            <Heading  size="md" textTransform="uppercase">
              Товары
            </Heading>
            <Text pt="2" fontSize="xl">
              Фильтруемый, сортируемый список товаров из базы данных.
            </Text>
          </Box>
          <Box as={Link} to={PATH.ORDERS}>
            <Heading size="md" textTransform="uppercase">
              Заказы
            </Heading>
            <Text pt="2" fontSize="xl">
              Таблица заказов с боковым списком товаров.
            </Text>
          </Box>
          <Box as={Link} to={PATH.USER}>
            <Heading size="md" textTransform="uppercase">
              Аккаунт
            </Heading>
            <Text pt="2" fontSize="xl">
              Доступные на данный момент настройки аккаунта.
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};
