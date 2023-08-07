export const PATH = {
  MAIN: "/",
  PRODUCTS: "/products",
  PRODUCT: "/products/:productId",
  ORDERS: "/orders",
  ORDER: "/orders/:orderId",
  USER: "/user",
};

export const errorCodes: IErrorsCode = {
  "auth/email-already-in-use": "Электронная почта уже используется",
  "auth/invalid-email": "Неверный адрес электронной почты",
  "auth/user-signed-out": "Выполнен выход из аккаунта",
  "auth/timeout": "Превышено время ожидания",
  "auth/too-many-requests": "Слишком много запросов",
  "auth/user-not-found": "Пользователь не найден",
  "auth/user-disabled": "Пользователь заблокирован",
};
export interface IErrorsCode {
  [key: string]: string;
}
export interface ISortState {
  sortID: number;
}
export interface IFilterPriceState {
  min: number;
  max: number;
  default: number[];
}
export interface IUserLoginState {
  name: string;
  uid: string;
  status: "admin" | "user";
  auth: boolean;
}
export interface ICartState {
  countCartItem: number;
  cartList: ICartItem[];
}
export interface IOrder {
  status: string;
  items: ICartItem[];
  dateTime: number;
  paymentForm: string;
  amount: number;
  userId: string;
  userId_dateTime: string;
}
export interface ICurrentProductInModal {
  product: IProduct;
}
export interface ICartItem {
  product: IProduct;
  count: number;
}
export interface IProduct extends Object {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  rating: {
    count: number;
    rate: number;
  };
  title: string;
}
export interface ISortTypes extends Object {
  length?: any;
  [key: number]: string;
}
export const SORTTYPES: ISortTypes = {
  0: "Популярные",
  1: "Сначала дешевые",
  2: "Сначала дорогие",
  3: "Высокий рейтинг",
};

export interface IFilters {
  min: number;
  max: number;
  sortType: number;
  page: number;
  sortBy: number;
}
export type TThumbValues = [number, number];