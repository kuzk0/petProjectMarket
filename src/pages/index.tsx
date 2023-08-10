import { Outlet } from "react-router";
import { Header } from "../components/sections/header";
import { Fragment } from "react";

const LayoutPage = () => {
  return (
    <Fragment>
      <Header />
      <Outlet />
    </Fragment>
  );
};
export default LayoutPage;
