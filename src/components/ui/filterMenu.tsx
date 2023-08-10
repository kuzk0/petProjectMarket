import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Tooltip,
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { FC, useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

import { setMin, setMax, setFromTo } from "../../store/slices/filterPriceProductSlice";
import { IFilterMenu } from "../../consts";

export const FilterMenu: FC<IFilterMenu> = (props) => {
  const refInputFrom = useRef<HTMLInputElement>(null);
  const refInputTo = useRef<HTMLInputElement>(null);
  let finalChangeFilterTimeouter = useRef<NodeJS.Timeout>();

  const dispatch = useDispatch();

  const minFilterPriceValue = useSelector((state: RootState) => state.filterPrice.min);
  const maxFilterPriceValue = useSelector((state: RootState) => state.filterPrice.max);
  const defaultFilterPriceValues = useSelector((state: RootState) => state.filterPrice.default);

  const [filterPriceThumbValues, setFilterPriceValues] = useState(defaultFilterPriceValues);
  const stepFilterPriceValue = 1;

  const thumbPropsUpdate = ([thumbValue1, thumbValue2]: number[]) => {
    setFilterPriceValues([thumbValue1, thumbValue2]);

    clearTimeout(finalChangeFilterTimeouter.current);
    finalChangeFilterTimeouter.current = setTimeout(() => {
      finalChangeFilter([thumbValue1, thumbValue2]);
    }, 500);
  };

  /**  finalChangeFilter
   * окончательное изменение фильтра цены, инфу которого можно уже отправлять для корректировки данных.
   */
  const finalChangeFilter = (filterPriceValue?: number[], min?: number, max?: number) => {
    if (filterPriceValue) dispatch(setFromTo(filterPriceValue));
    if (min) dispatch(setMin(min));
    if (max) dispatch(setMax(max));
  };

  const inputFromChangeHandle = (value: string) => {
    thumbPropsUpdate([+value, +refInputTo.current!.value || 0]);
  };
  const inputToChangeHandle = (value: string) => {
    thumbPropsUpdate([+refInputFrom.current!.value || 0, +value]);
  };

  useEffect(() => {
    // if (props.minPriceProduct !== minFilterPriceValue) dispatch(setMin(props.minPriceProduct));
    // if (props.maxPriceProduct !== maxFilterPriceValue) dispatch(setMax(props.maxPriceProduct));
    setFilterPriceValues([props.minPriceProduct, props.maxPriceProduct]);
  }, [
    props.minPriceProduct,
    props.maxPriceProduct,
    // minFilterPriceValue,
    //  maxFilterPriceValue,
    dispatch,
  ]);

  return (
    <Box h={600} w="100%" pos="sticky" top="20px">
      <Accordion defaultIndex={[0, 1, 2, 3]} allowMultiple>
        <AccordionItem rounded="xl">
          <AccordionButton>
            <Box as="span" flex="1" textAlign="left">
              Цена
            </Box>
            <AccordionIcon />
          </AccordionButton>

          <AccordionPanel pb={4}>
            <RangeSlider
              defaultValue={defaultFilterPriceValues}
              min={minFilterPriceValue}
              max={maxFilterPriceValue}
              step={stepFilterPriceValue}
              onChange={thumbPropsUpdate}
              value={filterPriceThumbValues}
            >
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <Tooltip label={filterPriceThumbValues[0]} placement="top">
                <RangeSliderThumb index={0} borderColor="blackAlpha.500" />
              </Tooltip>
              <Tooltip label={filterPriceThumbValues[1]} placement="top">
                <RangeSliderThumb index={1} borderColor="blackAlpha.500" />
              </Tooltip>
            </RangeSlider>

            <Flex gap={4}>
              <NumberInput
                step={stepFilterPriceValue}
                defaultValue={defaultFilterPriceValues[0]}
                min={minFilterPriceValue}
                max={filterPriceThumbValues[1]}
                value={filterPriceThumbValues[0]}
                onChange={inputFromChangeHandle}
                aria-label="filterPriceFrom"
                allowMouseWheel
              >
                <NumberInputField ref={refInputFrom} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>

              <NumberInput
                step={stepFilterPriceValue}
                defaultValue={defaultFilterPriceValues[1]}
                min={filterPriceThumbValues[0]}
                max={maxFilterPriceValue}
                value={filterPriceThumbValues[1]}
                onChange={inputToChangeHandle}
                aria-label="filterPriceTo"
                allowMouseWheel
              >
                <NumberInputField ref={refInputTo} />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
};
