import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface QuantitieI{
  [propName: string]: number;
}
 interface StateI{
  quantitie: QuantitieI,
  ingredientAddingOrder:string[],
  orderPrice: string
 }

const initialState: StateI = {
  quantitie: {},
  ingredientAddingOrder: [],
  orderPrice: "1.00",
};

const burgerSlice = createSlice({
  name: "burgerCreator",
  initialState,
  reducers: {
    addQuantitie: (state, action) => {
      state.quantitie = action.payload;
    },
    changingAmountOfIngredients: (state, action:PayloadAction<{ingredient:string, action:string, ingredientPrice:number }>) => {
      const actionIngredient = action.payload.ingredient;
      const actionClicked= action.payload.action;
      const  ingredientPrice = action.payload.ingredientPrice
      
      if (actionClicked === "decrement") {
        if (
          state.quantitie[actionIngredient] > 0 
        ) {
          state.quantitie[actionIngredient] -= 1;
          state.ingredientAddingOrder.splice(
            state.ingredientAddingOrder.findLastIndex((el) => el === actionIngredient),
            1
          );
          state.orderPrice = (
            +state.orderPrice - ingredientPrice
          ).toFixed(2);
        }
      }
      if (actionClicked === "increment") {
        if (state.quantitie[actionIngredient] < 5&&
          state.ingredientAddingOrder.length < 10) {
          state.quantitie[actionIngredient] += 1;
          state.ingredientAddingOrder.push(actionIngredient);
          state.orderPrice = (
            +state.orderPrice + ingredientPrice
          ).toFixed(2);
        }
      }
      
    },
    clearOrder: (state) => {
      const clearedBurgerCreator:QuantitieI = {};
      for (const ingredient in state.quantitie) {
        clearedBurgerCreator[ingredient] = 0;
      }
      if (state.ingredientAddingOrder.length !== 0) {
        state.quantitie = clearedBurgerCreator;
        state.orderPrice = "1.00";
        state.ingredientAddingOrder = [];
      }
    },
  },
});
export const { addQuantitie, changingAmountOfIngredients, clearOrder } =
  burgerSlice.actions;
export default burgerSlice.reducer;
