import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import '../App.css';

interface Customer {
	id: string;
	firstname: string;
	lastname: string;
	streetaddress: string;
	postcode: string;
	city: string;
	email: string;
	phone: string;
}

interface Props {
	saveCustomer: (customer: Customer) => void;
}

export default function AddCustomer({ saveCustomer }: Props) {
	const [open, setOpen] = useState(false);
	const [customer, setCustomer] = useState({
		id: '',
		firstname: '',
		lastname: '',
		streetaddress: '',
		postcode: '',
		city: '',
		email: '',
		phone: '',
	});

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setCustomer({ ...customer, [event.target.name]: event.target.value });
	};

	const addCustomer = () => {
		saveCustomer(customer);
		setCustomer({
			id: '',
			firstname: '',
			lastname: '',
			streetaddress: '',
			postcode: '',
			city: '',
			email: '',
			phone: '',
		});
		handleClose();
	};

	return (
		<div>
			<button className='addButton' onClick={handleClickOpen}>
				+ Add
			</button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>New Customer</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin='dense'
						name='id'
						value={customer.id}
						onChange={(event) => handleChange(event)}
						label='ID'
						fullWidth
						variant='standard'
					/>
					<TextField
						autoFocus
						margin='dense'
						name='firstname'
						value={customer.firstname}
						onChange={(event) => handleChange(event)}
						label='First Name'
						fullWidth
						variant='standard'
					/>
					<TextField
						autoFocus
						margin='dense'
						name='lastname'
						value={customer.lastname}
						onChange={(event) => handleChange(event)}
						label='Last Name'
						fullWidth
						variant='standard'
					/>
					<TextField
						margin='dense'
						name='streetaddress'
						value={customer.streetaddress}
						onChange={(event) => handleChange(event)}
						label='Street Address'
						fullWidth
						variant='standard'
					/>
					<TextField
						margin='dense'
						name='postcode'
						value={customer.postcode}
						onChange={(event) => handleChange(event)}
						label='Post Code'
						fullWidth
						variant='standard'
					/>
					<TextField
						margin='dense'
						name='city'
						value={customer.city}
						onChange={(event) => handleChange(event)}
						label='City'
						fullWidth
						variant='standard'
					/>
					<TextField
						margin='dense'
						name='email'
						value={customer.email}
						onChange={(event) => handleChange(event)}
						label='Email'
						fullWidth
						variant='standard'
					/>
					<TextField
						margin='dense'
						name='phone'
						value={customer.phone}
						onChange={(event) => handleChange(event)}
						label='Phone'
						fullWidth
						variant='standard'
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={addCustomer}>Save</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
