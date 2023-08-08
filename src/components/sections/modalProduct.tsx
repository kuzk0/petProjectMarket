import { Modal, ModalOverlay, ModalContent, ModalFooter, ModalBody, ModalCloseButton, Button, Box } from "@chakra-ui/react";
import { ProductCard } from "../ui/productCard";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { IModalProduct } from "../../consts";
import { FC } from "react";

export const ModalProduct: FC<IModalProduct> = (props) => {
  const { isOpenModalProduct, onCloseModalProduct } = props;
  const currentProductInModal = useSelector((state: RootState) => state.currentProductInModal.product);
  return (
    <Box>
      <Modal motionPreset="slideInBottom" scrollBehavior="outside" isOpen={isOpenModalProduct} onClose={onCloseModalProduct} size="3xl">
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader></ModalHeader> */}
          <ModalCloseButton />
          <ModalBody pb={6} overflow="overlay">
            <ProductCard inModal product={currentProductInModal} onOpenModalProduct={() => {}} />
          </ModalBody>

          <ModalFooter>
            <Button onClick={onCloseModalProduct}>Закрыть</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
