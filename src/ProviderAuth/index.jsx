import {authContext, useAuth} from "../PrivateRoute";
export default function ProviderAuth({children}) {
    let auth = useAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}
