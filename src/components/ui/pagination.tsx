import { Button, Flex, Menu, MenuButton, MenuItem, MenuList, Wrap, WrapItem } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { IPagination } from "../../consts";
import { FC, ReactElement, useEffect } from "react";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { setProductCurrentPage, setOrderCurrentPage, setOrderSortBy, setProductSortBy } from "../../store/slices/paginationSlice";
import { useSearchParams } from "react-router-dom";

export const Pagination: FC<IPagination> = (props) => {
  const { page, sortBy, countPages, list } = props;

  const dispather = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const sortByArr = [10, 20, 2];

  const sortByChangeHandle = (newSortBy: number) => {
    if (newSortBy !== sortBy) {
      searchParams.set("sortBy", newSortBy.toString());
      setSearchParams(searchParams);
    }
    if (list === "orders") dispather(setOrderSortBy(newSortBy));
    else if (list === "products") dispather(setProductSortBy(newSortBy));
  };
  const pageChangeHandle = (newPage: number) => {
    if (newPage > countPages || newPage <= 0) return;
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
      sortByChangeHandle(+queryParams.sortBy);
    }
    if (queryParams.page && +queryParams.page < countPages) {
      pageChangeHandle(+queryParams.page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, countPages, sortByArr]);

  const rows: ReactElement[] = [];
  if (countPages > 6) {
    rows.push(
      <WrapItem key="toStart">
        <Button onClick={() => pageChangeHandle(1)} variant={"outline"} colorScheme={"gray"}>
          В начало
        </Button>
      </WrapItem>
    );
    // for (let i = page < countPages - 3 ? (page > 1 ? page-1 : 0) : countPages - 4; i < (page > countPages - 4 ? countPages : page + 4); i++) {
    for (let i = page < countPages - 3 ? (page > 0 ? page : 0) : countPages - 3; i < (page > countPages - 3 ? countPages : page + 3); i++) {
      rows.push(
        <WrapItem key={i}>
          <Button onClick={() => pageChangeHandle(i + 1)} variant={i === page ? "solid" : "outline"} colorScheme={i === page ? "blue" : "gray"}>
            {i + 1}
          </Button>
        </WrapItem>
      );
    }

    rows.push(
      <WrapItem key="toEnd">
        <Button onClick={() => pageChangeHandle(countPages)} variant={"outline"} colorScheme={"gray"}>
          В конец
        </Button>
      </WrapItem>
    );
  } else {
    for (let i = 0; i < countPages; i++) {
      rows.push(
        <WrapItem key={i}>
          <Button onClick={() => pageChangeHandle(i + 1)} variant={i === page ? "solid" : "outline"} colorScheme={i === page ? "blue" : "gray"}>
            {i + 1}
          </Button>
        </WrapItem>
      );
    }
  }

  return (
    <Flex justifyContent="space-around">
      <Wrap>
        <WrapItem>
          <Button isDisabled={page <= 0} onClick={() => pageChangeHandle(page)}>
            <ChevronLeftIcon />
          </Button>
        </WrapItem>
        {rows}
        <WrapItem>
          <Button isDisabled={page + 1 >= countPages} onClick={() => pageChangeHandle(page + 2)}>
            <ChevronRightIcon />
          </Button>
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
                <MenuItem
                  key={value}
                  onClick={() => {
                    sortByChangeHandle(value);
                  }}
                >
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
