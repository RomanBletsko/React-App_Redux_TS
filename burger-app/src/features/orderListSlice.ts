import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getOrders } from "../Utils/Apis/index";

export interface OrderInfoI{
  orderAddress?: string,
  orderEmail?: string,
  orderFast?: boolean,
  orderName?: string,
  orderPhone?: string
  orderPrice?: string,
  orderProducts: {[propName: string]:number}
  __v: number,
  _id: string,
}
interface StateI {
  status:string,
  loading: boolean,
  error:any,
  orderList: OrderInfoI[][],
  pageNumbers: number,

}
const initialState: StateI = {
  status: "ide",
  loading: true,
  error: null,
  orderList: [],
  pageNumbers: 0,
};
export const fetchOrderList = createAsyncThunk<OrderInfoI[], undefined, { rejectValue:any }>(
  "orderList/fetchOrderList",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getOrders();
      const revesedOrderList = data.reverse();
      return revesedOrderList;
    } catch (error:any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
const sizePage:number = 9;
const buildOrdersPage = (array:any, sizePage:number):OrderInfoI[][] => {
  const arrayOfPages = [];
  for (let i = 0; i < 33; i += sizePage) {
    const subArray = array.slice(i, i + sizePage);
    arrayOfPages.push(subArray);
  }
  return arrayOfPages;
};

const orderListSlice = createSlice({
  name: "orderList",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(fetchOrderList.pending, (state) => {
        state.status = "losading";
        state.loading = true;
      })
      .addCase(fetchOrderList.fulfilled, (state, action:PayloadAction<OrderInfoI[]>) => {
        state.status = "succeeded";
        const arrayOfOrders = buildOrdersPage(action.payload, sizePage);
        state.orderList = arrayOfOrders;
        state.pageNumbers = arrayOfOrders.length;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchOrderList.rejected, (state, action:PayloadAction<string>) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default orderListSlice.reducer;
