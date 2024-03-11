import { createSlice } from "@reduxjs/toolkit";

const initAuth = {
    token:localStorage.getItem('token')||null,
    userDetails:localStorage.getItem('userDetails')?JSON?.parse(localStorage.getItem('userDetails')):null,
}

const authSlice = createSlice({
    name:"auth",
    initialState:initAuth,
    reducers:{
        login: (state,action) =>{
            localStorage.setItem('token',action?.payload.token)
            localStorage.setItem('userDetails',JSON.stringify(action.payload.userDetails))
            state.token = action.payload.token
            state.userDetails = action.payload.userDetails
        },
        logout: (state) =>{
            state.token = null
        }
    }
})

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;