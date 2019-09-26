import React, { useState, useEffect } from 'react';
import Contact from './Contact';

export const ContactsContainer = props => {
	const [state, setstate] = useState({
		contacts: props.contacts,
		isShowingFavorites: false
	});
	useEffect(() => {
		setstate(s => ({ ...s, contacts: props.contacts }));
	}, [props.contacts]);
	const search = term => {
		let Items;
		if (term) {
			Items = state.contacts.filter((contact, i) => {
				return (
					contact.name.toLowerCase().includes(term) ||
					contact.city.toLowerCase().includes(term) ||
					contact.phoneNumber.toLowerCase().includes(term) ||
					contact.email.toLowerCase().includes(term) ||
					contact.state.includes(term)
				);
			});
		} else {
			Items = props.contacts;
		}
		setstate({ ...state, contacts: Items });
	};
	const showFavorites = e => {
		if (state.isShowingFavorites) {
			setstate(prevState => ({
				contacts: props.contacts,
				isShowingFavorites: !prevState.isShowingFavorites
			}));
		} else {
			const contacts = props.contacts.filter(contact => contact.isFavorite);

			setstate(prevState => {
				return {
					contacts: contacts,
					isShowingFavorites: !prevState.isShowingFavorites
				};
			});
		}
	};

	return (
		<div>
			<button onClick={() => showFavorites()}>
				{state.isShowingFavorites ? 'Show All' : 'Show Favorites'}
			</button>
			<input
				type='search'
				placeholder='search'
				onChange={e => search(e.target.value.toLowerCase())}
			/>
			{state.contacts.map((contact, i) => (
				<Contact
					index={i}
					editContact={props.editContact}
					information={contact}
					key={i}
					removeContact={props.removeContact}
					markFavorite={props.markFavorite}
				/>
			))}
		</div>
	);
};
