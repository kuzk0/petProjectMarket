import { ISortState, IFilterPriceState, IUserLoginState, ICartState, ICurrentProductInModal, IPaginationState } from "../consts";

export const initialStateSort: ISortState = {
  sortID: 0,
};
export const initialStateFilterPrice: IFilterPriceState = {
  min: 0,
  max: 9999,
  default: [0, 9999],
};
export const initialStateLoginUser: IUserLoginState = {
  name: "",
  uid: "",
  status: "user",
  auth: false,
};
export const initialStatCart: ICartState = {
  countCartItem: 0,
  cartList: [],
};
export const initialStatePagination: IPaginationState = {
  orderCurrentPage: 1,
  productCurrentPage: 1,
  orderSortBy: 10,
  productSortBy: 10,
};
export const initialStateCurrentProductInModal: ICurrentProductInModal = {
  product: {
    id: 0,
    category: "",
    description: "",
    image: "",
    price: 0,
    rating: {
      count: 0,
      rate: 0,
    },
    title: "",
  },
};
