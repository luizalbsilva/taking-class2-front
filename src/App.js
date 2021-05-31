import './App.css';
import LoginComponent from "./LoginComponent";
import React from "react";
import {
    BrowserRouter as Router,
    Switch, Route
} from "react-router-dom"
import PrivateRoute, {useAuth} from "./PrivateRoute";

function App() {
    let auth = useAuth();

    return (
        <div className="container">
            <Router>
                <Switch>
                    <Route path="/login">
                        <LoginComponent auth={auth}></LoginComponent>
                    </Route>
                    <PrivateRoute path="/">
                        <h1>Bem vindo, Vossa Senhoria se encontra logado.</h1>
                    </PrivateRoute>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
