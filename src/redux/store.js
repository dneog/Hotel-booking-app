import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import loaderReducer from "./loaderSlice";
import orderReducer from "./orderSlice";
const rootReducer= combineReducers({
        user: userReducer,
        loading: loaderReducer,
        order: orderReducer

})

const store = configureStore({
    reducer: rootReducer,
    
})

export default store