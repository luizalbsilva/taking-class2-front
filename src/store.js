import {configureStore} from "@reduxjs/toolkit";

import sessionReducer from "./session-slice";

export default configureStore({
    reducer: {
        session: sessionReducer
    }
})

