import React, { Component } from 'react'
import UserData from './UserData';
import EditModal from './EditModal';
import Axios from 'axios';
import qs from 'qs';

class UserTable extends Component {
    state = {
        editModalState: false,
        data: {
            id: '',
            firstname: '',
            middlename: '',
            lastname: '',
            email: ''
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        
        const params = this.state.data;
        Axios.post('https://stevencham.com/react/api/edit-user', qs.stringify(params))
        .then(resp => {
            this.props.updateTableAfterUpdate();
            this.setEditModalState();
        });
    }

    onChange = (e) => {
        const val = e.target.value;
        this.setState({
            data: {
                ...this.state.data,
                [e.target.name]: val
            }
        });
    }

    toggleEditModal = (id, firstname, middlename, lastname, email) => {
        this.setEditModalState();
        this.setState({
            data: {
                id: id,
                firstname: firstname,
                middlename: middlename,
                lastname: lastname,
                email: email
            }
        })
    }

    closeModal = (e) => {
        this.setEditModalState();
    }

    setEditModalState() {
        this.setState((prev, props) => {
            const newState = !prev.editModalState;
            return { editModalState: newState }
        })
    }

    render() {
        return (
            <section style={ TableStyle }>
                <table className="table is-bordered is-striped">
                    <thead>
                        <tr>
                            <th className="has-text-centered">First Name</th>
                            <th className="has-text-centered">Middle Name</th>
                            <th className="has-text-centered">Last Name</th>
                            <th className="has-text-centered">Email</th>
                            <th className="has-text-centered"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <UserData usersData={ this.props.usersData }
                        deleteData={ this.props.deleteData }
                        toggleEditModal={ this.toggleEditModal }
                        />
                    </tbody>
                </table>

                <EditModal editModalState={ this.state.editModalState }
                closeModal={ this.closeModal } 
                data={ this.state.data }
                onChange={ this.onChange }
                onSubmit={ this.onSubmit }
                />
            </section>
        )
    }
}

const TableStyle = {
    overflow: 'auto',
    minWidth: '100px'
}

export default UserTable
