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
            localStorage.setItem('token',action.payload.token)
            localStorage.setItem('userDetails',JSON.stringify(action.payload.userDetails))
            state = {token:action.payload.token,userDetails:action.payload.userDetails,remember:action.payload.userDetails.remember}
        },
        logout: (state) =>{
            state.token = null
        },
        handlePermissions: (state,action)=>{
            state.permissions = action.payload
        },
    }
})

export const {login, logout, handlePermissions} = authSlice.actions;
export default authSlice.reducer;