import {
  getDatabase,
  ref,
  set,
  child,
  get,
  push,
  update,
  Database,
  remove,
  orderByChild,
  startAt,
  endAt,
  query,
  QueryConstraint,
  equalTo,
} from "firebase/database";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  deleteUser as deleteUserFromFirebase,
  User,
  updateProfile,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";

import { auth } from "../firebase";
import { store } from "../store";
import { errorCodes, ICartItem, IErrorsCode, IFilters, IOrder } from "../consts";

// console.log(AuthErrorCodes);

export function createUser(name: string, email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const globalStore = store.getState();
      const db: Database = getDatabase();
      set(ref(db, "users/" + userCredential.user.uid), {
        cart: globalStore.cart.cartList || "empty",
      });
      updateProfile(userCredential.user, { displayName: name });
      return { type: "success", data: userCredential.user.uid };
    })

    .catch((error) => {
      return { type: "error", data: errorCodes[error.code as keyof IErrorsCode] };
    });
}

export function getUserCart(userId: string) {
  return get(child(ref(getDatabase()), `users/` + userId + "/cart"));
}
export async function deleteUser(password: string) {
  const db: Database = getDatabase();
  const user: User = auth.currentUser as User;
  console.log(user);

  const credential = EmailAuthProvider.credential(user.email || "", password);

  return reauthenticateWithCredential(user, credential)
    .then((userCredential) => {
      return deleteUserFromFirebase(userCredential.user).then(() => {
        remove(ref(db, "users/" + userCredential.user.uid))
          .then(() => {
            return { type: "success", data: "Аккаунт удален" };
          })
          .catch((error) => {
            return { type: "error", data: errorCodes[error.code as keyof IErrorsCode] };
          });
      });
    })
    .catch((error) => {
      return { type: "error", data: errorCodes[error.code as keyof IErrorsCode] };
    });
}

export function signInUser(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      return { type: "success", data: userCredential.user.uid, name: auth.currentUser?.displayName };
    })
    .catch((error) => {
      return { type: "error", data: errorCodes[error.code as keyof IErrorsCode], name: "user" };
    });
}

export function signOutUser() {
  return signOut(auth);
}

export function setUserCart(cartList: ICartItem[]) {
  return set(ref(getDatabase(), "users/" + auth.currentUser?.uid + "/cart"), cartList || []);
}

export function changeCountCartItem(cartItem: ICartItem) {
  return set(ref(getDatabase(), "users/" + auth.currentUser?.uid + "/carts/"), cartItem);
}

export function getProducts(filters: IFilters) {
  let queryConstraint: QueryConstraint[];
  switch (filters.sortType) {
    case 0:
      queryConstraint = [orderByChild("rating/count")]; //b.rating.count - a.rating.count;limitToLast(filters.sortBy * filters.page)
      break;
    case 1:
      queryConstraint = [orderByChild("price"), startAt(filters.min), endAt(filters.max)]; //a.price - b.price;   limitToFirst(filters.sortBy * filters.page)
      break;
    case 2:
      queryConstraint = [orderByChild("price"), startAt(filters.min), endAt(filters.max)]; //a.price - b.price;  limitToLast(filters.sortBy * filters.page)
      // queryConstraint = [orderByChild("price"), startAt(filters.min), endAt(filters.max), limitToLast(filters.sortBy * filters.page)]; //a.price - b.price;
      break;
    case 3:
      queryConstraint = [orderByChild("rating/rate")]; //b.rating.rate - a.rating.rate;  limitToLast(filters.sortBy * filters.page)
      break;
    default:
      queryConstraint = [orderByChild("title")]; //limitToFirst(filters.sortBy * filters.page)
  }

  const db: Database = getDatabase();

  const queryGetProducts = query(ref(db, `products/`), ...queryConstraint);

  return get(queryGetProducts);
}

export function createOrder(order: IOrder) {
  const db: Database = getDatabase();
  const newPostKey: string | null = push(child(ref(db), "orders")).key;
  const updates: any = {};
  updates["/orders/" + newPostKey] = order;

  return update(ref(db), updates)
    .then(() => {
      console.log(" Data saved successfully!");
      return { type: "success", data: "Заказ сформирован" };
    })
    .catch((error) => {
      console.log(" The write failed...");
      return { type: "error", data: error.code };
    });
}

export function getOrders() {
  const db: Database = getDatabase();

  const queryGetProducts = query(ref(db, `orders/`), orderByChild("userId"), equalTo(auth.currentUser?.uid || ""));

  return get(queryGetProducts);
}
