import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";


import ingredientReducer from "../features/priceSlice";
import burgerReduser from "../features/burgerSlice";
import orderReducer from "../features/orderSlice";
import orderListRduser from "../features/orderListSlice";
import contactsReduser from "../features/contactsSlice";

 const store = configureStore({
  reducer: {
    ingredients: ingredientReducer,
    burger: burgerReduser,
    order: orderReducer,
    orderList: orderListRduser,
    contacts: contactsReduser,
  },
});
export default store

export const useAppDispatch: () => typeof store.dispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector