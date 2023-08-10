import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { FC } from "react";
import { IButtonPrev } from "../../../consts";

export const ButtonPrev: FC<IButtonPrev> = (props) => {
  const { page, pageChangeHandle } = props;
  const clickHandle = () => {
    pageChangeHandle(page);
  };
  const isDisabled = page <= 0;
  return (
    <Button isDisabled={isDisabled} onClick={clickHandle}>
      <ChevronLeftIcon />
    </Button>
  );
};
