import { FC } from "react";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { PATH } from "../consts";

import MainPage from "../pages/mainPage";
import ProductsPage from "../pages/productsPage";
import OrdersPage from "../pages/ordersPage";
import { TestPage } from "../pages/";
import ErrorPage from "../pages/errorPage";
import UserPage from "../pages/userPage";

export const Router: FC = () => {
  const router = createBrowserRouter([
    {
      element: <TestPage />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: PATH.MAIN,
          element: <MainPage />,
        },
        {
          path: PATH.PRODUCTS,
          element: <ProductsPage />,
          children: [
            {
              path: PATH.PRODUCT,
              element: <MainPage />,
            },
          ],
        },
        {
          path: PATH.ORDERS,
          element: <OrdersPage />,

          children: [
            {
              path: PATH.ORDER,
              element: <OrdersPage />,
            },
          ],
        },
        {
          path: PATH.USER,
          element: <UserPage />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
