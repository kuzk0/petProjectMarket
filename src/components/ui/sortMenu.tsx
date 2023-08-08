import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, Button, MenuList, MenuItem, Box } from "@chakra-ui/react";

import { FC } from "react";
import { SORTTYPES } from "../../consts";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

import { setSort } from "../../store/slices/sortProductSlice";

const SortMenu: FC = () => {
  const dispatch = useDispatch();
  const sortType = useSelector((state: RootState) => state.sort.sortID);

  const setSortTypeHandle = (e: any) => {
    dispatch(setSort(+e.target.dataset.sorttype));
  };

  return (
    <Menu>
      {({ isOpen }) => (
        <Box>
          <MenuButton colorScheme="blue" isActive={isOpen} as={Button} rightIcon={isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}>
            {SORTTYPES[sortType]}
          </MenuButton>

          <MenuList>
            <MenuItem data-sorttype={0} onClick={setSortTypeHandle}>
              Популярные
            </MenuItem>
            <MenuItem data-sorttype={1} onClick={setSortTypeHandle}>
              Сначала дешевые
            </MenuItem>
            <MenuItem data-sorttype={2} onClick={setSortTypeHandle}>
              Сначала дорогие
            </MenuItem>
            <MenuItem data-sorttype={3} onClick={setSortTypeHandle}>
              Высокий рейтинг
            </MenuItem>
          </MenuList>
        </Box>
      )}
    </Menu>
  );
};
export default SortMenu;
