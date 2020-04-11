import React, { Component } from 'react'
import { Link } from 'react-router-dom'

var LoggedInNav = ({clicklogout, navActive, toggleNav, clickNavLink}) => {
    return (
        <nav className="navbar is-primary is-fixed-top" role="navigation" aria-label="main navigation">
            <div className="container">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        <b>REACT-PHP CRUD</b>
                    </a>
                    <a href="#nav" role="button" className={`navbar-burger burger ${ navActive }`} 
                    aria-label="menu" 
                    aria-expanded="false"
                    onClick={ toggleNav }
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div className={`navbar-menu ${ navActive }`}>
                    <div className="navbar-start">
                        <Link to="/" className="navbar-item" onClick={ clickNavLink }>Home</Link>
                        <a href="#logout" role="button" className="navbar-item" onClick={ clicklogout }>Logout</a>
                    </div>
                </div>
            </div>
        </nav>
    )
}

var NotLoggedInNav = ({ navActive, toggleNav, clickNavLink }) => {
    return (
        <nav className="navbar is-primary is-fixed-top" role="navigation" aria-label="main navigation">
            <div className="container">
                <div className="navbar-brand">
                    <a className="navbar-item" href="/">
                        <b>REACT-PHP CRUD</b>
                    </a>
                    <a href="#nav" role="button" className={`navbar-burger burger ${ navActive }`} 
                    aria-label="menu" 
                    aria-expanded="false"
                    onClick={ toggleNav }
                    >
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div className={`navbar-menu ${ navActive }`}>
                    <div className="navbar-start">
                        <Link to="/" className="navbar-item" onClick={ clickNavLink }>Home</Link>
                        <Link to="/login" className="navbar-item" onClick={ clickNavLink }>Login</Link>
                        <Link to="/registration" className="navbar-item" onClick={ clickNavLink }>Registration</Link>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export class Header extends Component {
    state = {
        navActive: ''
    }

    toggleNav = (e) => {
        this.setState((prev, props) => {
            if(prev.navActive === '') {
                return { navActive: 'is-active' }
            } else {
                return { navActive: '' }
            }
        })
    }

    clickNavLink = (e) => {
        this.setState({
            navActive: ''
        })
    }

    render() {
        return this.props.logged_in ? 
        (
            <LoggedInNav clicklogout={ this.props.clicklogout }
            navActive={ this.state.navActive }
            toggleNav={ this.toggleNav }
            clickNavLink={ this.clickNavLink }
            />
        )
        :
        (
            <NotLoggedInNav
            navActive={ this.state.navActive }
            toggleNav={ this.toggleNav }
            clickNavLink={ this.clickNavLink }
            />
        )
    }
}

export default Header
