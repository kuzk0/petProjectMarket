import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { TfiCommentsSmiley } from "react-icons/tfi";
import { Flex, Text } from "@chakra-ui/react";
import { FC } from "react";
import { IRatingProductStar } from "../../consts";

export const RatingProductStar: FC<IRatingProductStar> = (props) => {
  const { rate, count } = props.productRating;

  const fillStarCount = [];

  for (let i = 0; i < Math.floor(rate); i++) {
    fillStarCount.push(<BsStarFill color="orange" key={i} />);
  }
  const halfStarBool = rate - fillStarCount.length >= 0.5;
  const unfillStarCount = [];
  
  for (let i = 0; i < 5 - (rate + (halfStarBool ? 1 : 0)); i++) {
    unfillStarCount.push(<BsStar color="orange" key={i} />);
  }
  return (
    <Flex alignItems="center" gap="2px">
      {fillStarCount}
      {halfStarBool && <BsStarHalf color="orange" />}
      {unfillStarCount}
      <Text ml={3} mr={5}>
        {rate}
      </Text>
      <TfiCommentsSmiley />
      <Text>{count}</Text>
    </Flex>
  );
};
