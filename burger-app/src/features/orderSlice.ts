import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { createOrder } from "../Utils/Apis/index";


interface OrderProductsI {
  [propName: string ]: number;
}
export interface OrderDataI{
  orderName: string,
      orderPhone: string,
      orderEmail: string,
      orderFast: boolean,
      orderAddress: string,
      orderProducts:OrderProductsI, 
      orderPrice: string,
}

interface StateI{
  modalActive: boolean,
  status: string,
  loading: boolean,
  error: any,
  createOrderStatus: boolean,
  sendOrderStatus: boolean,
}
const initialState:StateI = {
  modalActive: false,
  status: "ide",
  loading: false,
  error: null,
  createOrderStatus: false,
  sendOrderStatus: false,
};

export const fetchOrder = createAsyncThunk(
  "order/fetchOrder",
  async (orderData:OrderDataI, { rejectWithValue }) => {
    try {
      await createOrder(orderData);
    } catch (error:any) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "Order",
  initialState,
  reducers: {
    modalActiveChange: (state) => {
      state.modalActive = state.modalActive ? false : true;
    },
    createOrderStatusChange: (state, action:PayloadAction<boolean>) => {
      state.createOrderStatus = action.payload;
    },
    sendOrderStatusChange: (state, action:PayloadAction<boolean>) => {
      state.sendOrderStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrder.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.createOrderStatus = true;
      })
      .addCase(fetchOrder.fulfilled, (state) => {
        state.status = "succeeded";
        state.loading = false;
        state.sendOrderStatus = true;
        state.error = null;
      })
      .addCase(fetchOrder.rejected, (state, action:PayloadAction<any>) => {
        state.status = "failed";
        state.loading = false;
        state.sendOrderStatus = false;
        state.error = action.payload;
      });
  },
});
export const {
  modalActiveChange,
  createOrderStatusChange,
  sendOrderStatusChange,
} = orderSlice.actions;

export default orderSlice.reducer;
