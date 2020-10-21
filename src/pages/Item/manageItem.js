import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./styles.scss";
import { Card, CardContent, Button, Box } from '@material-ui/core';
import config from '../../config.json';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


class ManageItemPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            totalData: 0,
            items: [],
            open: false,
            deleteId: null
        }


    }

    componentDidMount() {
        this.getAllItem()
    }

    getAllItem(){
        var token = localStorage.getItem(config.CONSTANT.LOGIN_KEY);
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'authorization': `Bearer ${JSON.parse(token)}` },
        };
        return fetch(`${config.apiUrl}/items`, requestOptions)
        .then(result=>result.json()).then(result => {
            console.log('getall',result)
            this.setState({items:result.data})
        });
    }

    handleChangePage = (event, newPage) => {
        this.setState(prevState => ({
            ...prevState,
            'page': newPage
        }));
        this.props.getAllitems(this.state.rowsPerPage, newPage);
    }

    handleChangeRowsPerPage = (event) => {
        this.setState(prevState => ({
            ...prevState,
            'page': 0,
            'rowsPerPage': +event.target.value
        }));
        this.props.getAllitems(event.target.value, 0);
    }



    handlePartnerRemove = (itemId) => {
        var token = localStorage.getItem(config.CONSTANT.LOGIN_KEY);
        var data = { id : itemId ,is_delete :1}
        const requestOptions = {
            method: 'PUT',
            headers: { 'authorization': `Bearer ${JSON.parse(token)}`,'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
    
        return fetch(`${config.apiUrl}/items`, requestOptions)
            .then(result => {
                this.handleClose()
                this.getAllItem()
            }).catch(err =>{
                console.log('error-edit-item')
            });
    }

    handleClickOpen = (id) => {
        this.setState(prevState => ({
            open: true,
            deleteId: id
        }))
    }
    handleClose = () => {
        this.setState({
            open: false,
        })
    }

    render() {
        const { items } = this.state;

        return (
            <div className='manage-topic-page'>
                <Box mb={3}>
                    <Link to="/add-item"><Button variant="contained" color="primary">Add Item</Button></Link>
                </Box>
                <Card>
                    <CardContent>
                        <h2>Manage Item</h2>
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items && items.length > 0 &&
                                    <>
                                        {items.map((item, index) => {
                                            return (<tr key={index}>
                                                <td align="center">{index += 1}</td>
                                                <td align="center">{item.item_name}</td>
                                                <td align="center">{item.item_price}</td>
                                                <td align="center">
                                                    <Link to={"/edit-item/" + item.item_id}>
                                                        <Button
                                                            variant="outlined"
                                                            size="small"
                                                            color="primary"
                                                            style={{ marginRight: 5 }}
                                                        >
                                                            Edit
                                                    </Button>
                                                    </Link>
                                                    <Button
                                                        variant="outlined"
                                                        size="small"
                                                        color="secondary"
                                                        onClick={() => this.handleClickOpen(item.item_id)}
                                                    >
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                            )
                                        })}
                                    </>
                                }
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
                <Dialog open={this.state.open} onClose={() => this.handleClose()} aria-labelledby="form-dialog-title">
                    <DialogTitle>DELETE</DialogTitle>
                    <DialogContent>
                        Are you sure?
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleClose()} color="primary">
                            Cancel
                                </Button>
                        <Button onClick={() => this.handlePartnerRemove(this.state.deleteId)} color="primary">
                            Confirm
                                </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default ManageItemPage
