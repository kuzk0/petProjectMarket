import { FC, useEffect, useState } from "react";

import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import { PATH } from "../consts";

import MainPage from "../pages/mainPage";
import ProductsPage from "../pages/productsPage";
import OrdersPage from "../pages/ordersPage";
import LayoutPage from "../pages/";
import ErrorPage from "../pages/errorPage";
import UserPage from "../pages/userPage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { login } from "../store/slices/userSlice";
export const Router: FC = () => {
  const [isAuth, setIsAuth] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(login({ name: user.displayName || "user", uid: user.uid, auth: true, status: "user" }));
        setIsAuth(true);
      } else setIsAuth(false);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const router = createBrowserRouter([
    {
      element: <LayoutPage />,
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
          element: isAuth ? <OrdersPage /> : <Navigate to={PATH.MAIN} />,

          children: [
            {
              path: PATH.ORDER,
              element: <OrdersPage />,
            },
          ],
        },
        {
          path: PATH.USER,
          element: isAuth ? <UserPage /> : <Navigate to={PATH.MAIN} />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
