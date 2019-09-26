import './App.css';
import ContactsContainer from './components/ContactsContainer';
import AddContactForm from './components/AddContactForm';

import React, { Component } from 'react';

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isFormOpen: false,
			username: 'Alexander',
			phoneNumber: '7703695370',
			email: 'alexsantosantana@live.com',
			contacts: [
				{
					name: 'zlexander Santos',
					phoneNumber: '77803695370',
					address: '3155 Flowers Rd S',
					city: 'Dunwoody',
					state: 'GA',
					email: 'alexsantosantana@live.com',
					isFavorite: true
				},
				{
					name: 'Clexander Santos',
					phoneNumber: '77803695370',
					address: '3155 Flowers Rd S',
					city: 'Atlanta',
					state: 'GA',
					email: 'alexsantosantana@live.com'
				},
				{
					name: 'glexander Santos',
					phoneNumber: '7703695370',
					address: '3155 Flowers Rd S',
					city: 'Atlanta',
					state: 'GA',
					email: 'alexsantosantana@live.com'
				},
				{
					name: 'Elexander Santos',
					phoneNumber: '77803695370',
					address: '3155 Flowers Rd S',
					city: 'Norcrmoduleoss',
					state: 'GA',
					email: 'alexsantosantana@live.com'
				}
			]
		};
	}
	componentDidMount() {
		this.handleSort('name');
	}
	addContact = contact => {
		this.setState(prevState => ({
			...prevState,
			contacts: [...prevState.contacts, contact]
		}));
	};
	editContact = (contact, index) => {
		const newContacts = this.state.contacts.map(e => {
			if (contact === e) {
				e = contact;
			}
			return e;
		});
		this.setState(prevState => ({
			...prevState,
			contacts: newContacts
		}));
	};
	handleSort = value => {
		let sortedArray = [
			...this.state.contacts.sort((a, b) => {
				if (a[value] < b[value]) return -1;
				if (a[value] > b[value]) return 1;
				return 0;
			})
		];
		if (value === 'isFavorite') {
			sortedArray = this.state.contacts.sort((a, b) => {
				return a[value] === b[value] ? 0 : a[value] ? -1 : 1;
			});
		}
		this.setState(prevState => ({ ...prevState, contacts: sortedArray }));
	};
	removeContact = contact => {
		const newContacts = this.state.contacts.filter(item => item !== contact);
		this.setState(prevState => ({ ...prevState, contacts: [...newContacts] }));
	};
	editContact = (oldContact, newContact) => {
		const newContacts = this.state.contacts.map(item => {
			if (item === oldContact) {
				// console.log(item);

				item = newContact;
			}
			return item;
		});

		this.setState(prevState => ({ ...prevState, contacts: newContacts }));
	};
	markFavorite = contact => {
		const newContacts = this.state.contacts.map(item => {
			if (item === contact) {
				item.isFavorite = !item.isFavorite;
			}
			return item;
		});
		this.setState(prevState => ({ ...prevState, contacts: newContacts }));
	};

	render() {
		const { username, phoneNumber, email, contacts } = this.state;
		const buttonStyles = {
			borderRadius: '5px',
			border: '2px solid black',
			background: 'transparent',
			padding: '5px',
			fontSize: '16px',
			margin: ' 5px 8px'
		};
		return (
			<div>
				<div className='userInfo'>
					<h1>{username}</h1>
					<h3>{phoneNumber}</h3>
					<h4>{email}</h4>
				</div>
				<button
					onClick={() => {
						this.setState(prevState => ({
							...prevState,
							isFormOpen: !prevState.isFormOpen
						}));
					}}
					style={buttonStyles}>
					+
				</button>
				<AddContactForm
					isOpened={this.state.isFormOpen}
					addContact={this.addContact}
				/>
				<select
					name='sortBy'
					id=''
					onChange={e => this.handleSort(e.target.value)}>
					<option value='name'>Name(Ascending)</option>
					<option value='city'>City</option>
					<option value='isFavorite'>Favorites</option>
				</select>
				<ContactsContainer
					contacts={contacts}
					editContact={this.editContact}
					markFavorite={this.markFavorite}
					removeContact={this.removeContact}
				/>
			</div>
		);
	}
}
