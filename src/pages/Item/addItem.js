import React, { Component } from 'react';
import { Card, CardContent, Grid, Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import "./styles.scss";
import config from '../../config.json'
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

class AdditemPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: {
                item_name: "",
                item_price: '',
            },
            error:false,
            message:''
        }
    }

    handleChange = (event) => {
        var fieldName = event.target.name;
        var fieldValue = event.target.value;

        this.setState(prevState => ({
            item: {
                ...prevState.item,
                [fieldName]: fieldValue
            }
        }));
    };

    handleSubmit = () => {
        var token = localStorage.getItem(config.CONSTANT.LOGIN_KEY);
        var data = { item_name:this.state.item.item_name, item_price:this.state.item.item_price }
        const requestOptions = {
            method: 'POST',
            headers: { 'authorization': `Bearer ${JSON.parse(token)}` ,'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        };
    
        return fetch(`${config.apiUrl}/items`, requestOptions)
        .then(result=>result.json())
            .then(result => {
                if(result.status){
                    this.props.history.push('/manage-item');
                }else{
                    this.setState({error:true,message:result.message})
                }
            })
    }

    render() {
        const { item,message,error } = this.state;

        return (
            <div className='add-partner-page'>
                <Grid container>
                    <Grid item md={6} xs={12}>
                        <Card>
                            <CardContent>
                                {error&&(
                                <h6>{message}</h6>
                                )}
                                <h2>Add item</h2>
                                <ValidatorForm
                                    className='add-partner-form partner-form login-form'
                                    onSubmit={this.handleSubmit}
                                    ref="form"
                                    autoComplete="off">
                                    <Box component="div" m={2} ml={0}>
                                        <TextValidator
                                            fullWidth
                                            value={item.item_name}
                                            onChange={this.handleChange}
                                            id="text-name"
                                            name="item_name"
                                            className="form-control"
                                            label="Name *"
                                            margin="normal"
                                            variant="outlined"
                                            validators={['required']}
                                            errorMessages={['This field is required']}
                                        />
                                    </Box>
                                    <Box component="div" m={2} ml={0}>
                                        <TextValidator
                                            fullWidth
                                            value={item.item_price}
                                            onChange={this.handleChange}
                                            id="text-name"
                                            name="item_price"
                                            className="form-control"
                                            label="Price*"
                                            margin="normal"
                                            variant="outlined"
                                            validators={['required']}
                                            errorMessages={['This field is required']}
                                        />
                                    </Box>
                                    <Box component="div" m={2} ml={0}>
                                        <Button
                                            type="submit"
                                            variant="outlined"
                                            color="default"
                                            className="btn-primary btn-submit">
                                            Save
                                        </Button>
                                    </Box>
                                </ValidatorForm>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default AdditemPage