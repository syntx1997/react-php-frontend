import React, { Component } from 'react';

export class DataItem extends Component {
    state = {
        editModalState: false
    }
    
    clickDelete(id) {
        this.props.deleteData(id);
    }

    clickEdit(id, firstname, middlename, lastname, email) {
        this.props.toggleEditModal(id, firstname, middlename, lastname, email);
    }

    render() {

        const {id, firstname, middlename, lastname, email }  = this.props.usersData;
            
        return (
            <tr>
                <td className="has-text-centered">{ firstname }</td>
                <td className="has-text-centered">{ middlename }</td>
                <td className="has-text-centered">{ lastname }</td>
                <td className="has-text-centered">{ email }</td>
                <td className="has-text-centered">
                    <button className="button is-primary" 
                    onClick={ (e) => this.clickEdit(id, firstname, middlename, lastname, email) }
                    >
                        <span className="icon">
                            <i className="fa fa-pencil"></i>
                        </span>
                    </button>
                    {` `}
                    <button className="button is-danger" onClick={ (e) => this.clickDelete(id) }>
                        <span className="icon">
                            <i className="fa fa-trash"></i>
                        </span>
                    </button>
                </td>
            </tr>
        )
    }
}

export default DataItem
