import { Modal, ModalOverlay, ModalContent, ModalFooter, ModalBody, ModalCloseButton, Button, Box } from "@chakra-ui/react";
import { ProductCard } from "../ui/productCard";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const ModalProduct = (props: any) => {
  const { isOpenModalProduct: isOpen, onCloseModalProduct: onClose } = props;
  const currentProductInModal = useSelector((state: RootState) => state.currentProductInModal.product);
  return (
    <Box>
      <Modal motionPreset="slideInBottom" scrollBehavior="outside" isOpen={isOpen} onClose={onClose} size="3xl">
        <ModalOverlay />
        <ModalContent>
          {/* <ModalHeader></ModalHeader> */}
          <ModalCloseButton />
          <ModalBody pb={6}  overflow="overlay">
            <ProductCard inModal product={currentProductInModal} />
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose}>Закрыть</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};