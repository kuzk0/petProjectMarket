import { Modal, ModalOverlay, ModalContent, ModalFooter, ModalBody, ModalCloseButton, Button, Box, ModalHeader } from "@chakra-ui/react";
import { ProductCard } from "../ui/productCard";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { IModalProduct, PATH } from "../../consts";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

export const ModalProduct: FC<IModalProduct> = (props) => {
  const { isOpenModalProduct, onOpenModalProduct, onCloseModalProduct } = props;
  const currentProductInModal = useSelector((state: RootState) => state.currentProductInModal.product);

  const navigate = useNavigate();
  const onCloseModalProductHandle = () => {
    onCloseModalProduct();

    navigate(PATH.PRODUCTS);
  };
  return (
    <Box>
      <Modal motionPreset="slideInBottom" scrollBehavior="outside" isOpen={isOpenModalProduct} onClose={onCloseModalProductHandle} size="3xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader noOfLines={1} title={currentProductInModal.title} maxH="50px">
            {currentProductInModal.title}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <ProductCard inModal product={currentProductInModal} onOpenModalProduct={onOpenModalProduct} />
          </ModalBody>

          <ModalFooter>
            <Button onClick={onCloseModalProductHandle}>Закрыть</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
