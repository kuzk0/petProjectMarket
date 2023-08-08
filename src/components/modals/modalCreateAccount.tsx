import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Box,
  Text,
  InputGroup,
  InputRightElement,
  FormLabel,
  FormControl,
  useToast,
} from "@chakra-ui/react";
import { FC, useState } from "react";

import { Field, Form, Formik } from "formik";

import { createAccountSchema } from "../../utils/loginSchema";
import { createUser } from "../../utils/db";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/userSlice";
import { IModalCreateAccount } from "../../consts";

export const ModalCreateAccount: FC<IModalCreateAccount> = (props) => {
  const { isOpenModalCreateAccount, onCloseModalCreateAccount } = props;

  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [showConfirmPasswordInput, setShowConfirmPasswordInput] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const dispatch = useDispatch();

  const toast = useToast();

  const handleClickShowPasswordInput = () => setShowPasswordInput(!showPasswordInput);
  const handleClickShowConfirmPasswordInput = () => setShowConfirmPasswordInput(!showConfirmPasswordInput);

  const handleClickCreateAccount = ({ name, email, password }: { name: string; email: string; password: string }) => {
    setIsLoadingButton(true);
    createUser(name, email, password).then((result) => {
      setIsLoadingButton(false);
      if (result.type === "error") {
        toast({
          title: <Text>{result.data}</Text>,
          position: "top-right",
          status: "error",
          isClosable: true,
        });
      } else {
        dispatch(login({ name: name, uid: result.data, auth: true, status: "user" }));
        onCloseModalCreateAccount();
      }
    });
  };
  return (
    <Modal isOpen={isOpenModalCreateAccount} onClose={onCloseModalCreateAccount}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Создать аккаунт</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Formik
            initialValues={{
              name: "user",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            validationSchema={createAccountSchema}
            onSubmit={(values) => {
              handleClickCreateAccount(values);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <FormControl>
                  <FormLabel>Имя:</FormLabel>
                  <Field as={Input} name="name" type="text" autoComplete="name" />

                  <Box minH="30px">
                    <Text color="darkred">{errors.name && touched.name && errors.name} </Text>
                  </Box>
                </FormControl>
                <FormControl>
                  <FormLabel>Электронная почта:</FormLabel>
                  <Field as={Input} name="email" type="email" autoComplete="email" />

                  <Box minH="30px">
                    <Text color="darkred">{errors.email && touched.email && errors.email} </Text>
                  </Box>
                </FormControl>
                <FormControl>
                  <FormLabel>Пароль:</FormLabel>
                  <InputGroup size="md">
                    <Field as={Input} pr="4.5rem" type={showPasswordInput ? "text" : "password"} name="password" autoComplete="password" />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClickShowPasswordInput}>
                        {showPasswordInput ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <Box minH="30px">
                  <Text color="darkred">{errors.password && touched.password && errors.password} </Text>
                </Box>

                <FormLabel>Подтвердите пароль:</FormLabel>
                <InputGroup size="md">
                  <Field as={Input} pr="4.5rem" type={showConfirmPasswordInput ? "text" : "password"} name="confirmPassword" autoComplete="new-password" />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClickShowConfirmPasswordInput}>
                      {showConfirmPasswordInput ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>

                <Box minH="30px">
                  <Text color="darkred">{errors.confirmPassword && touched.confirmPassword && errors.confirmPassword} </Text>
                </Box>
                <ModalFooter p={0}>
                  <Button colorScheme="blue" mr={3} type="submit" isLoading={isLoadingButton}>
                    Создать аккаунт
                  </Button>

                  <Button onClick={onCloseModalCreateAccount}>Закрыть</Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
