import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getContacts } from "../Utils/Apis/index";

interface LocationsI{
  [propName: string]: string
}

interface ContactsI{
  email: string,
  fb:string,
  inst: string,
  locations:LocationsI,
  phone:string,
  tags:[],
  web:string,
  worktime: string,
  _id: string,

}
interface StateI{
  status: string,
  loading: boolean,
  error: any,
  contacts: [string,string][],
  location: [string,string][],

}
const initialState:StateI = {
  status: "ide",
  loading: true,
  error: null,
  contacts: [],
  location: [],
};
export const fetchContacts = createAsyncThunk<[ContactsI], undefined, {rejectValue:any}>(
  "contacts/fetchContacts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await getContacts();

      return data;
    } catch (error:any) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(fetchContacts.pending, (state) => {
        state.status = "losading";
        state.loading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action:PayloadAction<[ContactsI]>) => {
        state.status = "succeeded";
        console.log(action.payload)
        const contacts = Object.entries(action.payload[0]);
        contacts.splice(0, 2);
        const localObj = contacts.splice(5, 1);
        state.contacts = contacts;
        state.location = Object.entries(localObj[0][1]);
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchContacts.rejected, (state, action:PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export default contactsSlice.reducer;
