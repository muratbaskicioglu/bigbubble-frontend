import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import './LoginForm.css'

export default class LoginForm extends Component {
    constructor(props) {
        super(props)

        this.stepNames = ['login', 'name',
            'password', 'send', 'success']

        this.statusAlias = {
            'login': 0,
            'typing': 1,
            'send': this.stepNames.length - 2,
            'success': this.stepNames.length - 1
        }

        this.state = {
            redirectToReferrer: false,
            formStatus: 0,
            formStep: 0,
            username: '',
            password: '',
        }

        this.changeStatus = this.changeStatus.bind(this)
        this.nextStep = this.nextStep.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    changeStatus() {
        const currentStep = this.state.formStep

        if(this.state.formStep === this.statusAlias['login']) {
            this.setState({ formStatus: this.statusAlias['typing'], formStep: currentStep + 1 }, () => {
                console.log('Clicked login!')
                console.log('Called changeStatus() to typing')
                console.log('Current step: ' + this.state.formStep)
            })
        } else if(this.state.formStep === this.statusAlias['send']) {
            this.handleSubmit()
            console.log('Clicked send!')
            console.log('Called changeStatus() to send. Waiting for response...')
            console.log('Current step: ' + this.state.formStep)
            console.log('Current state: ' + JSON.stringify(this.state))
        }
    }

    nextStep() {
        console.log('Called nextStep()')

        const currentStep = this.state.formStep

        const inputValue = document.querySelector('#control-' + this.stepNames[currentStep]).value

        if(inputValue !== '') {
            this.setState({ formStep: currentStep + 1 }, () => {
                console.log('Entered input value: ' + inputValue)
                console.log('Clicked next button on ' + this.stepNames[currentStep] + '! Current step: ' + (currentStep + 1))
            })
        } else {
            this.setState({ formStep: currentStep - 1 }, () => {
                console.log('Field cannot be empty!')
                console.log('Clicked previous button on ' + this.stepNames[currentStep] + '! Current step: ' + (currentStep - 1))
            })
        }
    }

    handleChange(event) {
        const name = event.target.name
        this.setState(JSON.parse('{ "' + name + '": "' + event.target.value + '" }'))
    }

    handleSubmit() {

        console.log('Form submitted.')

        const user = {
            username: this.state.username,
            password: this.state.password
        }

        console.log('Submitted user: ' + JSON.stringify(user))

        this.props.fakeAuth.authenticate(() => {
            this.setState({ redirectToReferrer: true })
        })

        /*
        axios.post('http://bigbubble.com/user/login', user)
            .then(response => {
                console.log(response)
                console.log(response.data)
                if(response.data.status === 'success') {
                    this.setState({ formStatus: this.statusAlias['send'], formStep: this.statusAlias['success'] }, () => {
                        setTimeout(function() {
                            this.setState({ formStatus: this.statusAlias['login'], formStep: this.statusAlias['login'] })
                        }, 3000)
                    })
                }
            }).catch(error => {
            console.log(error);
        })
        */
    }

    render() {
        const { from } = this.props.location.state || { from: { pathname: "/" } };
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return <Redirect to={from} />;
        }

        return (
            <form className="login-form" onSubmit={ this.handleSubmit } data-step={ this.state.formStep } id={ this.stepNames[this.state.formStep] }>
                <div id="form_head" className="form-head" onClick={ this.changeStatus }>
                    <span className="text"></span>
                    <i className="icon-placeholder"></i>
                </div>
                <div className="form-body">
                    <span className="error-text">Please Fill Out This Field</span>
                    <input type="hidden" name="_csrf_token" value="{{ csrf_token('authenticate') }}" />
                    <div className="form-controls">
                        <input id="control-name" name="username" placeholder="Name" onChange={ this.handleChange } />
                        <input id="control-password" name="password" placeholder="Password" type="password" onChange={ this.handleChange }  />
                    </div>
                </div>
                <a id="form_action" className="form-action" onClick={ this.nextStep }>
                    <i className="icon-action"></i>
                </a>
            </form>
        )
    }
}