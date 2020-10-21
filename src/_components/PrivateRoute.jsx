import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import config from './../config.json';


export const PrivateRoute = ({ component: Component, ...rest }) =>
    (
        <Route {...rest} render={props => (
            localStorage.getItem(config.CONSTANT.LOGIN_KEY)
                ? (
                    <div className="dashboard-content">
                        <button onClick={()=>{
                            localStorage.removeItem(config.CONSTANT.LOGIN_KEY)
                            window.location.replace("/");
                            }}>Logout</button>
                        <main className="main-content">
                            <Component {...props} />
                        </main>
                    </div>
                )
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )} />
    )