import { configureStore } from "@reduxjs/toolkit";

import  authslicereducer from './authSlice'
const  store =configureStore({
reducer:
{  auth: authslicereducer}

})

export default store;
