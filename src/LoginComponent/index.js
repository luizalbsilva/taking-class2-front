import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {logon} from "./../session-slice";
import {Redirect, useHistory} from "react-router-dom";
import "./css/index.css";

export default function LoginComponentInterno() {
    const session = useSelector(state => state.session)
    const dispatch = useDispatch()
    const history = useHistory()

    const [usuario, setUsuario] = useState({
            username: '',
            senha: ''
    });

    const [state, setState] = useState({
        attemptError: false
    });

    function updateUsername(e) {
        let user = Object.assign({}, usuario);
        user.username = e.currentTarget.value;
        setUsuario(user);
    }

    function updatePassword(e) {
        let user = Object.assign({}, usuario);
        user.senha = e.currentTarget.value;
        setUsuario(user);
    }

    function doLogon(e) {
        fetch("http://localhost:4000/logon", {
            method: "post",
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body: JSON.stringify({user: usuario.username, pass: usuario.senha})
        }).then(value => {
            const deuCerto = value.status === 200;
            state.attemptError = !deuCerto;
            if (deuCerto) {
                value.json().then(body => {
                    dispatch(logon({jwt: body["access-token"], user: usuario}));
                    history.push("/");
                })
            }
            setState(state);
        }).catch(err => {
            state.attemptError = true;
            setState(state);
        })

    }

    let divErro = undefined;
    if (state.attemptError) {
        divErro = <span className="msgErro">Usuario e/ou senha Inválido(s)</span>;
    }

    if (
        session.jwt
    ) return <Redirect to={{pathname: '/'}} />
    else
    return (
        <div className="login-div">
            <h1>Login</h1>
            <label htmlFor="username" className="form-label">Username</label>
            <input className="user-name form-control" id="username" onChange={(e) => updateUsername(e)}/>
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" onChange={e => updatePassword(e)}/>
            {divErro}
            <button className="btn btn-success" onClick={e => doLogon(e)}>Login</button>
        </div>
    )
}
