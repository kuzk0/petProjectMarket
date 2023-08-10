import { Button } from "@chakra-ui/react";
import { FC } from "react";
import { IButtonPage } from "../../../consts";

export const ButtonPage:FC<IButtonPage> = (props) => {
  const { page, pageChangeHandle, iterator } = props;
  const clickHandle = () => {
    pageChangeHandle(iterator + 1);
  };

  const variant = iterator === page ? "solid" : "outline";
  const colorScheme = iterator === page ? "blue" : "gray";
  return (
    <Button onClick={clickHandle} variant={variant} colorScheme={colorScheme}>
      {iterator + 1}
    </Button>
  );
};
