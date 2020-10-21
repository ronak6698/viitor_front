import React, { Component } from 'react';
import logo from './../../assets/images/logo.png';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import config from '../../config.json'
import "./styles.scss";
import { Card, CardContent } from '@material-ui/core';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
class LoginPage extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            user: {
                email: "",
                password: "",
            },
        }
    }

    handleChange = (event) => {
        const { user } = this.state;
        user[event.target.name] = event.target.value;
        this.setState({ user });
    }

    generateToken(length) {
        return Math.random().toString(36).substr(2, length);
    }

    handleSubmit = () => {

        var email_id = this.state.user.email;
        var password = this.state.user.password;


        if (email_id && password) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email_id, password })
            };
        
            return fetch(`${config.apiUrl}/login`, requestOptions)
            .then(result=>result.json())
                .then(result => {
                    localStorage.setItem(config.CONSTANT.LOGIN_KEY, JSON.stringify(result.data.token));    
                    window.location.replace("/manage-item");
                    // this.props.history.push('/manage-item');
                }).catch(err =>{
                    
                });
        }
    }

    render() {
        const { user } = this.state;

        return (
            <div className='login-box'>
                <Card>
                    <CardContent>
                        <h2 className="text-center">Login</h2>
                        <ValidatorForm
                            className='login-form'
                            onSubmit={this.handleSubmit}
                            ref="form"
                            autoComplete="off">

                            <TextValidator
                                fullWidth
                                value={user.email}
                                onChange={this.handleChange}
                                name="email"
                                className="form-control"
                                id="outlined-name"
                                label="Email Address"
                                margin="normal"
                                variant="outlined"
                                validators={['required', 'isEmail']}
                                errorMessages={['this field is required', 'Email address is not valid']}
                            />
                            <TextValidator
                                fullWidth
                                value={user.password}
                                onChange={this.handleChange}
                                name="password"
                                type="password"
                                className="form-control"
                                id="outlined-name"
                                label='Password'
                                margin="normal"
                                variant="outlined"
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                            <Button type="submit" variant="outlined" color="default" className="btn-primary btn-submit">Login</Button>

                        </ValidatorForm>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default LoginPage;