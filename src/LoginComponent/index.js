import React from "react";

import "./css/index.css";

export default class LoginComponent extends React.Component {
    constructor(prop) {
        super(prop);
        this.state = {
            usuario: {
                login: '',
                senha: ''
            }, state : {
                attemptError: false
            }
        }
    }

    updateUsername(e) {
        const {usuario} = this.state;
        usuario.login = e.target.value;
        this.setState({usuario});
    }

    updatePassword(e) {
        const {usuario} = this.state;
        usuario.senha = e.target.value;
        this.setState({usuario});
    }

    render() {

        let divErro = undefined;
        if (this.state.state.attemptError) {
            divErro = <span className="msgErro">Usuario e/ou senha Inválido(s)</span>;
        }

        return (
            <div className="login-div">
                <h1>Login</h1>
                <label htmlFor="username" className="form-label">Username</label>
                <input className="user-name form-control" id="username" onChange={this.updateUsername.bind(this)}/>
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" onChange={this.updatePassword.bind(this)}/>
                {divErro}
                <button className="btn btn-success" onClick={() => this.logon()}>Login</button>
            </div>
        );
    }

    logon() {
        const {state, usuario} = this.state;

        fetch("http://localhost:4000/logon", {
            method: "post",
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body:JSON.stringify({user: usuario.login, pass: usuario.senha})
        }).then(value => {
            const deuCerto = value.status === 200;
            state.attemptError = !deuCerto;
            if (deuCerto) {
                value.json().then( body => {
                        if (typeof this.props.onLogon) {
                            this.props.onLogon(body["access-token"]);
                        }
                })
            }
            this.setState({state});
        }).catch(err => {
            state.attemptError = true;
            this.setState({state});
        })

    }
}
