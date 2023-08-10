import { Button } from "@chakra-ui/react";
import { FC } from "react";
import { IButtonEnd } from "../../../consts";

export const ButtonToEnd: FC<IButtonEnd> = (props) => {
  const { pageChangeHandle, countPages } = props;
  const clickHandle = () => {
    pageChangeHandle(countPages);
  };
  return (
    <Button onClick={clickHandle} variant={"outline"} colorScheme={"gray"}>
      В конец
    </Button>
  );
};
