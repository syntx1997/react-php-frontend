import React, { Component } from 'react';
import DataItem from './DataItem';
export class UserData extends Component {
    state = {
        editModalState: false
    }

    render() {
        if(this.props.usersData.length === 0) {
            return (
                <tr>
                    <td colspan="5" className="has-text-centered">
                        no data yet, add now
                    </td>
                </tr>
            );
        }

        return this.props.usersData.map((users) => (
            <DataItem key={ users.id }
            usersData={ users } 
            deleteData={ this.props.deleteData }
            toggleEditModal={ this.props.toggleEditModal }
            showData={ this.props.showData }
            />
        ));
    }
}

export default UserData
