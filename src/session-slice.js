import {createSlice} from "@reduxjs/toolkit";
const STORAGE_KEY = "logon.data";

let initialState = JSON.parse( window.localStorage.getItem(STORAGE_KEY) );

if (initialState == null) {
    initialState = {
        jwt: null,
        user: null
    }
}
export const sessionSlice = createSlice( {
    name: "session",
    initialState: initialState,
    reducers: {
        logon: (session, {payload}) => {
            const {jwt, user} = payload;
            session.jwt = jwt;
            session.user = user;
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify( {jwt, user} ));
        }
    }
});

export const {logon} = sessionSlice.actions;

export default sessionSlice.reducer;
