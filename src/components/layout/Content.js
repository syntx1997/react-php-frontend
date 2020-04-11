import React, { Component } from 'react'
import AddData from '../AddData'
import UserTable from '../UserTable'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

export class Content extends Component {

    render() {
        if(!this.props.logged_in) {
            return <Redirect to="/login" />
        }

        return (
        <section className="section">
            <AddData submitData={ this.props.submitData } />
            <UserTable usersData={ this.props.usersData }
            deleteData={ this.props.deleteData }
            updateTableAfterUpdate={ this.props.updateTableAfterUpdate }
            />
        </section>
        )
    }
}

Content.propTypes = {
    submitData: PropTypes.func.isRequired
}

export default Content
