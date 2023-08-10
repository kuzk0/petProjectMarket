import { ChevronRightIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { FC } from "react";
import { IButtonNext } from "../../../consts";

export const ButtonNext:FC<IButtonNext> = (props) => {
  const { page, pageChangeHandle, countPages } = props;
  const clickHandle = () => {
    pageChangeHandle(page + 2);
  };
  const isDisabled = page + 1 >= countPages;
  return (
    <Button isDisabled={isDisabled} onClick={clickHandle}>
      <ChevronRightIcon />
    </Button>
  );
};
