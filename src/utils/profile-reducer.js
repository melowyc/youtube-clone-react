import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        username: null,
        country: null,
        age: null,
        interest: null,
        hometown: null,
        avatar: "/images/avatar/profile.png",
        likes: [],
        follows: [],
    },
    reducers: {
        updateProfile (state, action) {
            console.log({...state, ...action.payload})
            return {...state, ...action.payload}
        }
    }
})
export const {updateProfile} = profileSlice.actions;
export default profileSlice.reducer;