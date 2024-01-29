import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async ({ categoryBy, sortBy, lineBy, search, currentPage }) => {
    const { data } = await axios.get(
      `https://656ee0506529ec1c6236d4b2.mockapi.io/items${categoryBy}${sortBy}&order=${lineBy}&search=${search}&page=${currentPage}&limit=4`
    );
    return data;
  }
);


export const pizzaSlice = createSlice({
  name: 'pizza',
  isLoading: true,
  initialState: {
    items: [],
		status: 'loading' // loading | success | error
  },
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
		.addCase(fetchPizzas.pending, (state) => {
			state.status = 'loading';
			state.items = [];
		})
		.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items.push(action.payload);
			state.status = 'success';
    })
		.addCase(fetchPizzas.rejected, (state) => {
			state.status = 'error';
			state.items = [];
		})
  },
});



export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
