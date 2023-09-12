import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentUser: null,
    
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    SET_USER: (state, action)=> {
        state.currentUser= action.payload
    }
  }
});

export const {SET_USER} = userSlice.actions

export const selectUser= (state)=> state.user.currentUser

export default userSlice.reducer

