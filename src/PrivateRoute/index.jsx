import {Route, Redirect} from "react-router-dom";
import {useContext, createContext} from "react";
import {useSelector} from "react-redux";

export default function PrivateRoute({children, ...rest}) {
    const session = useSelector(state => state.session );
    return (
        <Route
            {...rest}
            render={
                () => session.jwt ? children : (<Redirect to={{pathname: "/login"}} />)
            }
        />
    );
};
