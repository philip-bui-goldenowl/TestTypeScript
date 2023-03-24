import ShortBy from "@/containers/ShortBy";
import { Filtered } from "@/types/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type Product = {
  filtered: Filtered
}
const productInitialState: Product = {
  filtered: {
    shortBy: '',
    value: ''
  }
}
const slice = createSlice({
  name: 'auth',
  initialState: productInitialState,
  reducers: {
    updateShortBy: (state, action: PayloadAction<Filtered>) => {
      state.filtered = action.payload
    },
  },
});
export const { updateShortBy } = slice.actions
export default slice.reducer;