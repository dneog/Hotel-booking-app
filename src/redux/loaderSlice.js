import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    loading: false
}

const loaderSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    SET_LOADING: (state, action)=> {
        state.loading= action.payload
    }
  }
});

export const {SET_LOADING} = loaderSlice.actions
export const selectLoading = (state)=> state.loading.loading
export default loaderSlice.reducer