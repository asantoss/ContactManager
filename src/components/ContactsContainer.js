import React, { Component } from 'react';
import Contact from './Contact';

export default class ContactsContainer extends Component {
	constructor(props) {
		super(props);
		this.state = { contacts: this.props.contacts, isShowingFavorites: false };
	}
	search = term => {
		let Items;
		if (term) {
			Items = this.state.contacts.filter((contact, i) => {
				return (
					contact.name.toLowerCase().includes(term) ||
					contact.city.toLowerCase().includes(term) ||
					contact.phoneNumber.toLowerCase().includes(term) ||
					contact.email.toLowerCase().includes(term) ||
					contact.state.includes(term)
				);
			});
		} else {
			Items = this.props.contacts;
		}
		this.setState({ contacts: Items });
	};
	showFavorites = e => {
		if (this.state.isShowingFavorites) {
			this.setState(prevState => ({
				contacts: this.props.contacts,
				isShowingFavorites: !prevState.isShowingFavorites
			}));
		} else {
			const contacts = this.props.contacts.filter(
				contact => contact.isFavorite
			);

			this.setState(prevState => {
				return {
					contacts: contacts,
					isShowingFavorites: !prevState.isShowingFavorites
				};
			});
		}
	};
	render() {
		return (
			<div>
				<button onClick={() => this.showFavorites()}>
					{this.state.isShowingFavorites ? 'Show All' : 'Show Favorites'}
				</button>
				<input
					type='search'
					placeholder='search'
					onChange={e => this.search(e.target.value.toLowerCase())}
				/>
				{this.state.contacts.map((contact, i) => (
					<Contact
						index={i}
						editContact={this.props.editContact}
						information={contact}
						key={i}
						removeContact={this.props.removeContact}
						markFavorite={this.props.markFavorite}
					/>
				))}
			</div>
		);
	}
}
