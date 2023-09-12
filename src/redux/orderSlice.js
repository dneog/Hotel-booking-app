import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderDetails: {},
    userOrder: {}
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    ORDER_DETAILS(state, action){
        state.orderDetails= action.payload
    },
    USER_ORDER(state,action){
      state.userOrder= action.payload
    }
  }
});

export const {ORDER_DETAILS, USER_ORDER} = orderSlice.actions
export const selectOrder= (state)=> state.order.orderDetails
export const selectUserOrder= (state)=> state.order.userOrder
export default orderSlice.reducer