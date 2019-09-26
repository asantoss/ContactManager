import React, { Component } from 'react';

export default class AddContactForm extends Component {
	constructor(props) {
		super(props);
		this.state = this.props.contactInfo || {
			name: '',
			email: '',
			phoneNumber: '',
			address: '',
			city: '',
			state: '',
			zipCode: ''
		};
	}
	handleSubmit = e => {
		const { ...contactInfo } = this.state;
		e.preventDefault();

		if (this.props.contactInfo) {
			return this.props.addContact(this.props.contactInfo, contactInfo);
		}
		this.props.addContact(contactInfo);
		Object.keys(contactInfo).forEach(key => {
			this.setState(prevSate => ({ ...prevSate, [key]: '' }));
		});
	};
	handleInput = (key, value) => {
		this.setState(prevState => ({ ...prevState, [key]: value }));
	};
	render() {
		const buttonStyles = {
			borderRadius: '5px',
			border: '2px solid black',
			background: 'transparent',
			padding: '5px',
			fontSize: '16px',
			margin: ' 5px 8px'
		};
		const { ...contactInfo } = this.state;
		return (
			<div>
				<div style={{ display: this.props.isOpened ? 'block' : 'none' }}>
					<form onSubmit={this.handleSubmit}>
						{Object.keys(contactInfo).map((key, i) => {
							const type =
								key === 'phoneNumber' || key === 'zipCode' ? 'number' : key;
							if (key === 'isFavorite') {
								return null;
							}
							return (
								<label
									htmlFor=''
									key={i}
									style={{ textTransform: 'capitalize' }}>
									{key}
									<input
										type={type}
										value={this.state[key]}
										id={`${key}Input`}
										onChange={e => {
											this.handleInput(key, e.target.value);
										}}
									/>
								</label>
							);
						})}
						<button style={buttonStyles} type='submit'>
							Submit
						</button>
					</form>
				</div>
			</div>
		);
	}
}
