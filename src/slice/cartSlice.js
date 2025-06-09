import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    totalItem: localStorage.getItem("totalItem") ? JSON.parse(localStorage.getItem("totalItems")): 0,
}

const cartSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setToken(state, value){
            state.token = value.payload;
        },
    },
});

export const {setToken} = cartSlice.actions;
export default cartSlice.reducer;