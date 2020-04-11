import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Axios from 'axios'
import qs from 'qs'
import SuccessAlert from '../layout/SuccessAlert'

export class registration extends Component {
    state = {
        username: '',
        password: '',
        showAlert: false
    }

    onChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const params = {
            username: this.state.username,
            password: this.state.password
        }

        Axios.post('https://stevencham.com/react/api/register-user', qs.stringify(params))
        .then(resp => {
            this.setState({
                showAlert: !this.state.showAlert
            })
        });
        
        this.setState({
            username: '',
            password: ''
        });
    }

    render() {

        if(this.props.logged_in) {
            return <Redirect to="/" />
        }

        return (
            <div className="container">
                <section className="section">
                    <div className="columns">
                        <div className="column"></div>
                        <div className="column">
                            <div className="card">
                                <header className="card-header">
                                    <p className="card-header-title">
                                        Registration
                                    </p>
                                </header>
                                <form onSubmit={ this.onSubmit }>
                                    <SuccessAlert 
                                    showAlert={ this.state.showAlert }
                                    message="You have successfully registered!"
                                    />
                                    <div className="card-content">
                                        <div className="content">
                                            <div className="field">
                                                <label className="label">Username</label>
                                                <div className="control">
                                                    <input className="input" type="text" name="username"
                                                    value={ this.state.username }
                                                    onChange={ this.onChange }
                                                    />
                                                </div>
                                            </div>
                                            <div className="field">
                                                <label className="label">Password</label>
                                                <div className="control">
                                                    <input className="input" type="password" name="password"
                                                    value={ this.state.password }
                                                    onChange={ this.onChange }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <footer className="card-footer">
                                        <div className="card-content">
                                            <button className="button is-primary">Register</button>
                                        </div>
                                    </footer>
                                </form>
                            </div>
                        </div>
                        <div className="column"></div>
                    </div>
                </section>
            </div>
        )
    }
}

export default registration
