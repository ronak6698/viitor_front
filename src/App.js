import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import config from './config.json'
import { Container } from '@material-ui/core';

import { PrivateRoute } from '../src/_components';

import  LoginPage  from './pages/LoginPage';
import  RegisterPage  from './pages/RegisterPage';

import addItem  from './pages/Item/addItem'
import editItem from './pages/Item/editItem'
import  manageItem from './pages/Item/manageItem'
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
class App extends Component {
    constructor(props) {
        super(props);
this.state={
    isLogged :false
}
    }
componentDidMount(){
    const token = localStorage.getItem(config.CONSTANT.LOGIN_KEY);
    if(token != null){
        this.setState({isLogged:true})
    }
}

    render() {
        const {isLogged} =this.state;
        return (
            <Container maxWidth={false} className="no-padding">
                <Router history={history}>
                    <Switch>
                        <Route path="/login">
                            <LoginPage />
                        </Route>
                        <Route path="/register">
                            <RegisterPage />
                        </Route>
                        <PrivateRoute path="/manage-item" component={manageItem} />
                        <PrivateRoute path="/add-item" component={addItem} />
                        <PrivateRoute path="/edit-item/:id" component={editItem} />
                        <Route path="/">
                        {isLogged ? <manageItem /> :<RegisterPage />}
                        </Route>
                    </Switch>
                </Router>

            </Container >
        );
    }
}
export default App 