import { Button } from "@chakra-ui/react";
import { FC } from "react";
import { IButtonStart } from "../../../consts";

export const ButtonToStart: FC<IButtonStart> = (props) => {
  const { pageChangeHandle, page } = props;
  const clickHandle = () => {
    pageChangeHandle(page);
  };
  return (
    <Button onClick={clickHandle} variant={"outline"} colorScheme={"gray"}>
      В начало
    </Button>
  );
};
