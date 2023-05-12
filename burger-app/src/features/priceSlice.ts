import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getPrices } from "../Utils/Apis/index";

export interface PricesType{
  name:string,
  price:number,
  _id:string,
  tags:[],
}
 interface StateType{
  prices: PricesType[],
  ingredients:string[],
  status:string,
  loading: boolean,
  error: any,

 }
const initialState:StateType = {
  prices: [],
  ingredients: [],
  status: "ide",
  loading: false,
  error: null,
};

export const fetchIngredient = createAsyncThunk<PricesType[], undefined, {rejectValue:any}>(
  "ingredient/fetchIngredient",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getPrices();
      return data;
    } catch (error:any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
const ingredientSlice = createSlice({
  name: "ingredient",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredient.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredient.fulfilled, (state, action:PayloadAction<PricesType[]>) => {
        state.status = "succeeded";
        const data = action.payload;
        const ingredients = data.map((ingredient:PricesType) => {
          return ingredient.name;
        });
        
        state.prices = data;
        state.ingredients = ingredients;
        state.loading = false;
        
      })
      .addCase(fetchIngredient.rejected, (state, action:PayloadAction<string>) => {
        state.status = "failed";
        state.error = action.payload;
        state.loading = false;
      });
  },
});
export default ingredientSlice.reducer;
