import React, { Component } from 'react'
import {
	BrowserRouter as Router,
	Route,
	Link,
	Redirect,
	withRouter
} from 'react-router-dom'
import axios from 'axios';
import SignupForm from './Components/Forms/SignupForm'
import LoginForm from './Components/Forms/LoginForm'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isAuthenticated: false,
        }
    }

    checkAuth() {
        const userAuth = {
            csrf_token: 'capensis'
        }

        axios.post('http://bigbubble.com/user/login', userAuth)
            .then(response => {
                console.log(response)
                console.log(response.data)
            })
    }

    render () {
        return (
            <Router>
                <div>
                    <Route path="/signup" component={SignupForm} />
                    <Route path="/login" render={ routeProps => <LoginForm
                        {...routeProps}
                        fakeAuth={fakeAuth}
                    />
                    } />
                    <PrivateRoute exact path="/" component={Home} />
                </div>
            </Router>
        )
    }
}

class Home extends Component {
    render() {
        return (
            <div>
                <h2>Hello bubble fans! I'm your home.</h2>
            </div>
        )
    }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            fakeAuth.isAuthenticated ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
)

const fakeAuth = {
    isAuthenticated: false,
    authenticate(callback) {
        this.isAuthenticated = true
        setTimeout(callback, 100)
    },
    signout(callback) {
        this.isAuthenticated = false
        setTimeout(callback, 100)
    }
}

export default App
