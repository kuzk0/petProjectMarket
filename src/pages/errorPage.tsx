import { Flex, Card, CardHeader, Heading, CardBody, Stack, Text, StackDivider, Box } from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { PATH } from "../consts";
import { FC } from "react";

const ErrorPage: FC = () => {
  return (
    <Flex direction="column" h="100vh" justifyContent="center" align="center" maxW={{ xl: "1280px" }} m="0 auto">
      <Card>
        <CardHeader>
          <Heading size="md" textColor="red.600">
            Ошибка загрузки
          </Heading>
        </CardHeader>

        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <Box as={Link} to={PATH.PRODUCTS}>
              <Heading size="md" textTransform="uppercase">
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
    </Flex>
  );
};

export default ErrorPage;
