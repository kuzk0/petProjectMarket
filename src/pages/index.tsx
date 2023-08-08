import { Outlet } from "react-router";
import { Header } from "../components/sections/header";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { auth } from "../firebase";
import { updateCart } from "../store/slices/cartSlice";
import { login, signOut } from "../store/slices/userSlice";
import { getUserCart } from "../utils/db";

const LayoutPage = () => {
  const dispatch = useDispatch();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(login({ name: user.displayName || "user", uid: user.uid, auth: true, status: "user" }));
      getUserCart(user.uid).then((dataSnapshot) => {
        if (dataSnapshot.exists()) {
          const cartData = dataSnapshot.val();
          dispatch(
            updateCart({
              countCartItem: cartData.length,
              cartList: cartData,
            })
          );
        }
      });
    } else {
      dispatch(signOut());
    }
  });
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
export default LayoutPage;
