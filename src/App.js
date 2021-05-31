import './App.css';
import LoginComponent from "./LoginComponent";
import React from "react";

class App extends React.Component {
    constructor(prop) {
        super(prop);
        this.state = {
            jwt: '',
            connected: false
        }
    }

    doLogon(e) {
        this.setState({
            jwt: e,
            connected: true
        });
    }

    render() {
        let c = undefined;
        if(! this.state.connected) {
            c = <LoginComponent onLogon={this.doLogon.bind(this)}></LoginComponent>
        } else {
            c = <h1>Bem vindo, Vossa Senhoria se encontra logado.</h1>
        }
        return (
            <div className="container">
                {c}
            </div>
        );
    }
}

export default App;
