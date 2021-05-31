import {Route, Redirect} from "react-router-dom";
import {useContext, createContext} from "react";

export const authContext = createContext({});

export function useAuth() {
    return useContext(authContext);
}

export default function PrivateRoute({children, ...rest}) {
    const auth = useAuth();
    return (
        <Route
            {...rest}
            render={
                () => auth.jwt ? children : (<Redirect to={{pathname: "/login"}} />)
            }
        />
    );
};
