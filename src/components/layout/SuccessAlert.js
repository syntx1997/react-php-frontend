import React, { Component } from 'react'

export class SuccessAlert extends Component {
    render() {
        if(!this.props.showAlert) {
            return null;
        }

        return (
            <div className="card-content">
                <div className="notification is-success">
                    { this.props.message }
                </div>
            </div>
        )
    }
}

export default SuccessAlert
