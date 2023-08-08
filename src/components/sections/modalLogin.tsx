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
import { FC, useRef, useState } from "react";

import { Field, Form, Formik } from "formik";

import { loginSchema } from "../../utils/loginSchema";
import { getUserCart, signInUser } from "../../utils/db";
import { useDispatch } from "react-redux";
import { updateCart } from "../../store/slices/cartSlice";
import { login } from "../../store/slices/userSlice";
import { IModalLogin } from "../../consts";

export const ModalLogin:FC<IModalLogin> = (props) => {
  const { isOpenModalLogin, onCloseModalLogin } = props;

  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const handleClickShowPasswordInput = () => setShowPasswordInput(!showPasswordInput);

  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const dispatch = useDispatch();

  const toast = useToast();

  const signInHandle = ({ email, password }: { email: string; password: string }) => {
    setIsLoadingButton(true);
    signInUser(email, password)
      .then((result) => {
        if (result.type === "error") {
          toast({
            title: <Text>{result.data || "Ошибка"}</Text>,
            position: "top-right",
            status: "error",
            isClosable: true,
          });
        } else {
          getUserCart(result.data).then((dataSnapshot) => {
            if (dataSnapshot.exists()) {
              const cartData = dataSnapshot.val();
              dispatch(
                updateCart({
                  countCartItem: cartData.length,
                  cartList: cartData,
                })
              );
            }
          });

          dispatch(login({ name: result.name || "user", uid: result.data, auth: true, status: "user" }));
        }
      })
      .finally(() => {
        setIsLoadingButton(false);
        onCloseModalLogin();
      });
  };

  return (
    <Modal initialFocusRef={initialRef} finalFocusRef={finalRef} isOpen={isOpenModalLogin} onClose={onCloseModalLogin}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Войти в аккаунт</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginSchema}
            onSubmit={(values, { resetForm }) => {
              signInHandle(values);
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <FormControl>
                  <FormLabel>Email:</FormLabel>
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

                <ModalFooter p={0}>
                  <Button type="submit" isLoading={isLoadingButton} colorScheme="blue" mr={3}>
                    Войти
                  </Button>

                  <Button onClick={onCloseModalLogin}>Закрыть</Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
