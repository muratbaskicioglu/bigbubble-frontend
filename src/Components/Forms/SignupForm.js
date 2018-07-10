import React, { Component } from 'react'
import axios from 'axios'
import './SignupForm.css'

export default class SignupForm extends Component {
	constructor(props) {
		super(props);

		this.stepNames = ['signup', 'name', 'phone', 'email',
											'password', 'password-repeat', 'success']

		this.statusAlias = {
			'signup': 0,
			'typing': 1,
			'send': this.stepNames.length - 1
		}
		
		this.state = {
			formStatus: 0,
			formStep: 0
		}

		this.changeStatus = this.changeStatus.bind(this)
		this.nextStep = this.nextStep.bind(this)
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
			this.setState({ formStatus: this.statusAlias['send'], formStep: this.statusAlias['signup'] }, () => {
				console.log('Clicked send!')
				console.log('Called changeStatus() to waiting')	
				console.log('Current step: ' + this.state.formStep)
			})
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
	
	render() {
		return (
			<form className="signup-form" data-step={ this.state.formStep } id={ this.stepNames[this.state.formStep] }>
        <div id="form_head" className="form-head" onClick={ this.changeStatus }>
            <span className="text"></span>
            <i className="icon-placeholder"></i>
        </div>
        <div className="form-body">
            <span className="error-text">Please Fill Out This Field</span>
            <input type="hidden" name="_csrf_token" value="{{ csrf_token('authenticate') }}" />
            <div className="form-controls">
                <input id="control-name" placeholder="Name" />
                <input id="control-phone" placeholder="Phone No" />
                <input id="control-email" placeholder="Email" />
                <input id="control-password" placeholder="Password" type="password" />
                <input id="control-password-repeat" placeholder="Confirm Password" type="password" />
            </div>
        </div>
        <a id="form_action" className="form-action" onClick={ this.nextStep }>
            <i className="icon-action"></i>
        </a>
			</form>
		)	
	}
}
