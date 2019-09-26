import React, { useState } from 'react';
import AddContactForm from './AddContactForm';

export default function Contact(props) {
	const [State, setState] = useState({
		isOpenend: false,
		isFormOpen: false,
		color: ''
	});
	const { name, state, city } = props.information;
	const hiddenAttributes = ['phoneNumber', 'address', 'email', 'zipCode'];
	let hideStyle = {
		display: State.isOpenend ? 'block' : 'none',
		color: State.color,
		cursor: 'pointer'
	};
	const editContact = (oldContact, newContact) => {
		props.editContact(oldContact, newContact);
		setState({ isOpenend: true, isFormOpen: !State.isFormOpen });
	};

	return (
		<div
			style={
				props.information.isFavorite ? { color: 'red' } : { color: 'black' }
			}>
			<button onClick={() => setState({ isOpenend: !State.isOpenend })}>
				+
			</button>
			<button
				onClick={() => setState({ ...State, isFormOpen: !State.isFormOpen })}>
				Edit
			</button>
			<h5>{name}</h5>
			<div>
				{hiddenAttributes.map((key, i) => (
					<p key={i} style={hideStyle}>
						{props.information[key]}
					</p>
				))}
				{city && state && (
					<p>
						{city}, {state}
					</p>
				)}
			</div>
			<button onClick={() => props.removeContact(props.information)}>X</button>
			<button onClick={() => props.markFavorite(props.information)}>
				Favorite
			</button>
			{State.isFormOpen && (
				<AddContactForm
					isOpened={State.isFormOpen}
					addContact={editContact}
					contactInfo={props.information}
				/>
			)}
		</div>
	);
}
