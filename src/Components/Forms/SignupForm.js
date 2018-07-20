import React, { Component } from 'react'
import axios from 'axios'
import './SignupForm.css'

export default class SignupForm extends Component {
	constructor(props) {
		super(props);

		this.stepNames = ['signup', 'name', 'phone', 'email',
											'password', 'password-repeat', 'send', 'success']

		this.statusAlias = {
			'signup': 0,
			'typing': 1,
			'send': this.stepNames.length - 2,
            'success': this.stepNames.length - 1
		}
		
		this.state = {
			formStatus: 0,
			formStep: 0,
            username: '',
            phone: '',
            email: '',
            password: '',
            passwordRepeat: ''
		}

		this.changeStatus = this.changeStatus.bind(this)
		this.nextStep = this.nextStep.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
	}
 
	changeStatus() {
		const currentStep = this.state.formStep
	
		if(this.state.formStep === this.statusAlias['signup']) {
			this.setState({ formStatus: this.statusAlias['typing'], formStep: currentStep + 1 }, () => {
				console.log('Clicked signup!')
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
            email: this.state.email,
            password: this.state.password
        }

        console.log('Submitted user: ' + JSON.stringify(user))

        axios.post('http://bigbubble.com/user/register', user)
            .then(response => {
                console.log(response)
                console.log(response.data)
                if(response.data.status === 'success') {
                    this.setState({ formStatus: this.statusAlias['send'], formStep: this.statusAlias['success'] }, () => {
                       setTimeout(function() {
                           this.setState({ formStatus: this.statusAlias['signup'], formStep: this.statusAlias['signup'] })
                       }, 3000)
                    })
                }
            }).catch(error => {
                console.log(error);
            })
    }

	render() {
		return (
			<form className="signup-form" onSubmit={ this.handleSubmit } data-step={ this.state.formStep } id={ this.stepNames[this.state.formStep] }>
                <div id="form_head" className="form-head" onClick={ this.changeStatus }>
                    <span className="text"></span>
                    <i className="icon-placeholder"></i>
                </div>
                <div className="form-body">
                    <span className="error-text">Please Fill Out This Field</span>
                    <input type="hidden" name="_csrf_token" value="{{ csrf_token('authenticate') }}" />
                    <div className="form-controls">
                        <input id="control-name" name="username" placeholder="Name" onChange={ this.handleChange } />
                        <input id="control-phone" name="phone" placeholder="Phone No" onChange={ this.handleChange }  />
                        <input id="control-email" name="email" placeholder="Email" onChange={ this.handleChange }  />
                        <input id="control-password" name="password" placeholder="Password" type="password" onChange={ this.handleChange }  />
                        <input id="control-password-repeat" name="passwordRepeat" placeholder="Confirm Password" type="password" onChange={ this.handleChange }  />
                    </div>
                </div>
                <a id="form_action" className="form-action" onClick={ this.nextStep }>
                    <i className="icon-action"></i>
                </a>
			</form>
		)	
	}
}
