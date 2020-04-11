import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Header from './components/layout/Header'
import Content from './components/layout/Content'
import Footer from './components/layout/Footer'
import Login from './components/login/Login'
import Registration from './components/Registration/registration'

import Axios from 'axios';
import qs from 'qs';

class App extends Component {
  state = {
    usersData: [],
    logged_in: false,
    token_isValid: false
  }

  componentDidMount() {
    this.showData();
    this.LoggedIn();
  }

  LoggedIn() {
    var token = localStorage.getItem('token');
    this.checkToken(token);
  }

  checkToken = (token) => {
    const params = {
      token: token
    }

    Axios.post('https://your-backend-link/react/api/check-token', qs.stringify(params))
    .then(resp => {
      if(resp.data.valid === true) {
        this.setState({
          token_isValid: !this.state.token_isValid,
          logged_in: !this.state.logged_in
        })
      }
    });
  }

  submitLogin = (username, password) => {
    const params = {
      username: username,
      password: password
    }

    Axios.post('https://your-backend-link/react/api/login-user', qs.stringify(params))
    .then(resp => {
        if(resp.data.logged_in === true && resp.data.token !== '') {
          localStorage.setItem('token', resp.data.token);
          this.setState({
            token_isValid: !this.state.token_isValid,
            logged_in: !this.state.logged_in
          });
        }
    } );
  }

  showData() {
    Axios.get('https://your-backend-link/react/api/get-user')
    .then(resp => this.setState({ usersData: resp.data }));
  }

  updateTableAfterUpdate = (e) => {
    this.showData();
  }

  clicklogout = (e) => {
    localStorage.clear();
    this.setState({
      logged_in: !this.state.logged_in,
      token_isValid: !this.state.token_isValid
    })
  }

  submitData = (firstname, middlename, lastname, email) => {
    const params = {
      firstname   : firstname,
      middlename  : middlename,
      lastname    : lastname,
      email       : email
    }

    Axios.post('https://your-backend-link/react/api/add-user', qs.stringify(params))
    .then(resp => {
      this.showData();
    })
  }

  deleteData = (id) => {
    const that = this;

    const params = {
      id: id
    }

    Axios.post('hhttps://your-backend-link/react/api/delete-user', qs.stringify(params))
    .then(resp => {
      that.showData();
    })
    .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <Router>
          <Header logged_in={ this.state.logged_in }
          clicklogout={ this.clicklogout } />
            <div style={ ContentStyle }>
              <Switch>
                <Route exact path="/" render={ props => (
                  <React.Fragment>
                    <Content
                      submitData={ this.submitData }
                      usersData={ this.state.usersData }
                      deleteData={ this.deleteData }
                      updateTableAfterUpdate={ this.updateTableAfterUpdate }
                      logged_in={ this.state.logged_in }
                      />
                  </React.Fragment>
                ) } />
                <Route path="/login" component={ () => 
                  <Login submitLogin={ this.submitLogin }
                  logged_in={ this.state.logged_in } /> 
                } />
                <Route path="/registration" component={ () =>
                  <Registration logged_in={ this.state.logged_in } />
                } />
              </Switch>
            </div>
          <Footer />
        </Router>
      </div>
    )
  }
}

const ContentStyle = {
  paddingTop: '40px'
}

export default App
