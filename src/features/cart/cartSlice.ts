import axios from 'axios';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProductType } from '../../types/Product';
import { isAuthenticate } from '../../utils/localstorage';

interface CartState {
  value: any[];
  loading: boolean
}

const initialState: CartState = {
  value: [],
  loading: false,
}

const cart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart(state, action: PayloadAction<any>) {
      const productAdd :any = action.payload
      console.log(productAdd);
      state.value.cartItems = state.value.cartItems.map(product => product.product == productAdd.produdct ? productAdd : product);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCart.pending, (state) => {
      state.loading = true
    });
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload
    });
  }
})

export const { addCart } = cart.actions
export default cart.reducer

export const getCart = createAsyncThunk(
  "cart/getCart",
  async () => {
    const {token, user} = isAuthenticate()
    const { data } = await axios.get(`http://localhost:8000/api/cart/${user._id}`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
    return data 
  }
)