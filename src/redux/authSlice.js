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
            state.value = {token:action.payload.token,userDetails:action.payload.userDetails}
        },
        logout: (state) =>{
            state.token = null
        },
        handlePermissions: (state,action)=>{
            state.value.permissions = action.payload
        },
    }
})

export const {login, logout, handlePermissions} = authSlice.actions;
export default authSlice.reducer;