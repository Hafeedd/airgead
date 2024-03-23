import { createSlice } from "@reduxjs/toolkit";

const initAuth = {
    token:localStorage.getItem('token')||null,
    userDetails:localStorage.getItem('userDetails')?JSON?.parse(localStorage.getItem('userDetails')):null,
    permissions:localStorage.getItem('permissions')?JSON?.parse(localStorage.getItem('permissions')):[],
}

const authSlice = createSlice({
    name:"auth",
    initialState:initAuth,
    reducers:{
        login: (state,action) =>{
            localStorage.setItem('token',action.payload.token)
            localStorage.setItem('userDetails',JSON.stringify(action.payload.userDetails))
            state = {token:action.payload.token,userDetails:action.payload.userDetails}
        },
        logout: (state) =>{
            localStorage.removeItem('token')
            localStorage.removeItem('userDetails')
            state.token = null
            state.userDetails = null
            state.permissions = null
        },
        handlePermissions: (state,action)=>{
            state.permissions = action.payload
        },
    }
})

export const {login, logout, handlePermissions} = authSlice.actions;
export default authSlice.reducer;