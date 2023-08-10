import { Button, Flex, Menu, MenuButton, MenuItem, MenuList, Wrap, WrapItem } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { IPagination } from "../../consts";
import { FC, ReactElement, useEffect } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { setProductCurrentPage, setOrderCurrentPage, setOrderSortBy, setProductSortBy } from "../../store/slices/paginationSlice";
import { useSearchParams } from "react-router-dom";
import { ButtonNext } from "./paginationButtons/buttonNext";
import { ButtonPrev } from "./paginationButtons/buttonPrev";
import { ButtonPage } from "./paginationButtons/buttonPage";
import { ButtonToEnd } from "./paginationButtons/buttonToEnd";
import { ButtonToStart } from "./paginationButtons/buttonToStart";

export const Pagination: FC<IPagination> = (props) => {
  const { page, sortBy, countPages, list } = props;

  const dispather = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const sortByArr = [10, 20, 2];

  const sortByChangeHandle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    sortByChange(+(e.target as HTMLInputElement).value);
  };

  const sortByChange = (newSortBy: number) => {
    if (newSortBy !== sortBy) {
      searchParams.set("sortBy", newSortBy.toString());
      setSearchParams(searchParams);
    }
    if (list === "orders") dispather(setOrderSortBy(newSortBy));
    else if (list === "products") dispather(setProductSortBy(newSortBy));
  };

  const pageChangeHandle = (newPage: number) => {
    if (newPage > countPages) newPage = countPages;
    if (newPage <= 0) newPage = 1;
    if (newPage !== page + 1) {
      searchParams.set("page", newPage.toString());
      setSearchParams(searchParams);
    }

    if (list === "orders") dispather(setOrderCurrentPage(newPage));
    else if (list === "products") dispather(setProductCurrentPage(newPage));
  };

  useEffect(() => {
    const queryParams = {
      page: searchParams.get("page"),
      sortBy: searchParams.get("sortBy"),
    };
    if (queryParams.sortBy && sortByArr.includes(+queryParams.sortBy)) {
      sortByChange(+queryParams.sortBy);
    }
    if (queryParams.page) {
      pageChangeHandle(+queryParams.page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, countPages, sortByArr]);

  const rows: ReactElement[] = [];

  /**
   * if (countPages > 6)
   * rows = [1] [2] [3] [4] [5] [6]
   * else
   * [start] [page] [page+1] [page+2] [end]
   *
   * from:
   * 0 < page < countPages-3
   *
   * to:
   * page+3<countPages
   */
  if (countPages > 6) {
    rows.push(
      <WrapItem key="toStart">
        <ButtonToStart pageChangeHandle={pageChangeHandle} page={1} />
      </WrapItem>
    );

    /**
     * from:
     * 0 < page < countPages-3
     * page < countPages - 3 ? (page > 0 ? page : 0) : countPages - 3;
     *
     * to:
     * page+3<countPages
     * (page+3 > countPages ? countPages : page + 3)
     */
    for (let i = page < countPages - 3 ? (page > 0 ? page : 0) : countPages - 3; i < (page + 3 > countPages ? countPages : page + 3); i++) {
      rows.push(
        <WrapItem key={i}>
          <ButtonPage page={page} pageChangeHandle={pageChangeHandle} iterator={i} />
        </WrapItem>
      );
    }

    rows.push(
      <WrapItem key="toEnd">
        <ButtonToEnd page={page} countPages={countPages} pageChangeHandle={pageChangeHandle} />
      </WrapItem>
    );
  } else {
    for (let i = 0; i < countPages; i++) {
      rows.push(
        <WrapItem key={i}>
          <ButtonPage page={page} pageChangeHandle={pageChangeHandle} iterator={i} />
        </WrapItem>
      );
    }
  }

  return (
    <Flex justifyContent="space-around">
      <Wrap>
        <WrapItem>
          <ButtonPrev page={page} pageChangeHandle={pageChangeHandle} />
        </WrapItem>
        {rows}
        <WrapItem>
          <ButtonNext page={page} pageChangeHandle={pageChangeHandle} countPages={countPages} />
        </WrapItem>
      </Wrap>
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton as={Button} isActive={isOpen} rightIcon={isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}>
              {sortBy}
            </MenuButton>
            <MenuList>
              {sortByArr.map((value) => (
                <MenuItem key={value} value={value} onClick={sortByChangeHandle}>
                  {value}
                </MenuItem>
              ))}
            </MenuList>
          </>
        )}
      </Menu>
    </Flex>
  );
};
