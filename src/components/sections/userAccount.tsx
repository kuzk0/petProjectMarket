import { FC, useEffect, useState } from "react";
import {
  Text,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
  Tag,
  TagLabel,
  TagLeftIcon,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Box,
  useToast,
} from "@chakra-ui/react";

import { auth } from "../../firebase";

import { PATH } from "../../consts";

import { useNavigate } from "react-router";

import { User, onAuthStateChanged } from "firebase/auth";

import { FaUserLarge } from "react-icons/fa6";
import { deleteUser } from "../../utils/db";

import { Field, Form, Formik } from "formik";
import { passwordSchema } from "../../utils/loginSchema";

export const UserAccount: FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User>({} as User);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const toast = useToast();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else navigate(PATH.MAIN);
    });
  }, [navigate]);

  const deleteAccountHandle = ({ password }: { password: string }) => {
    deleteUser(password).then((result) => {
      if (result?.type === "error") {
        toast({
          title: <Text>{result.data || "Ошибка"}</Text>,
          position: "top-right",
          status: "error",
          isClosable: true,
        });
        setIsLoadingButton(false);
      } else {
        toast({
          title: <Text>Аккаунт удален</Text>,
          position: "top-left",
          status: "success",
          isClosable: true,
        });
        setIsLoadingButton(false);
        navigate(PATH.MAIN);
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <Heading size="md">
          {currentUser.displayName}
          <Tag ml={5} variant="subtle" colorScheme="messenger">
            <TagLeftIcon boxSize="12px" as={FaUserLarge} />
            <TagLabel>Пользователь</TagLabel>
          </Tag>
        </Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Formik
            initialValues={{
              password: "",
            }}
            validationSchema={passwordSchema}
            onSubmit={(values, { resetForm }) => {
              setIsLoadingButton(true);
              deleteAccountHandle(values);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <Flex flexDirection="column" h="auto" p={10}>
                  <Button textTransform="uppercase" size="md" type="submit" p={10} colorScheme="red" isLoading={isLoadingButton}>
                    Удалить аккаунт
                  </Button>
                  <Text pt="2" fontSize="xl">
                    Удаляет аккаунт и все его данные
                  </Text>
                </Flex>
                <FormControl>
                  <FormLabel>Пароль:</FormLabel>
                  <InputGroup size="md">
                    <Field as={Input} pr="4.5rem" type={show ? "text" : "password"} name="password" autoComplete="password" />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Box minH="30px">
                  <Text color="darkred">{errors.password && touched.password && errors.password} </Text>
                </Box>
              </Form>
            )}
          </Formik>
        </Stack>
      </CardBody>
    </Card>
  );
};
