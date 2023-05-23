import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import '../App.css';

export default function EditCustomer(props: any) {
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

	const handleOpen = () => {
		setCustomer({
			id: props.id.id,
			firstname: props.id.firstname,
			lastname: props.id.lastname,
			streetaddress: props.id.streetaddress,
			postcode: props.id.postcode,
			city: props.id.city,
			email: props.id.email,
			phone: props.id.phone,
		});
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

	const editCustomer = () => {
		props.updateCustomer(customer, props.id.id);
		handleClose();
	};

	return (
		<div>
			<button className='edit' onClick={handleOpen}>
				Edit
			</button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Edit Customer</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin='dense'
						disabled={true}
						name='id'
						value={customer.id}
						onChange={handleChange}
						label='ID'
						fullWidth
						variant='standard'
					/>
					<TextField
						autoFocus
						margin='dense'
						name='firstname'
						value={customer.firstname}
						onChange={handleChange}
						label='First Name'
						fullWidth
						variant='standard'
					/>
					<TextField
						autoFocus
						margin='dense'
						name='lastname'
						value={customer.lastname}
						onChange={handleChange}
						label='Last Name'
						fullWidth
						variant='standard'
					/>
					<TextField
						margin='dense'
						name='streetaddress'
						value={customer.streetaddress}
						onChange={handleChange}
						label='Street Address'
						fullWidth
						variant='standard'
					/>
					<TextField
						margin='dense'
						name='postcode'
						value={customer.postcode}
						onChange={handleChange}
						label='Post Code'
						fullWidth
						variant='standard'
					/>
					<TextField
						margin='dense'
						name='city'
						value={customer.city}
						onChange={handleChange}
						label='City'
						fullWidth
						variant='standard'
					/>
					<TextField
						margin='dense'
						name='email'
						value={customer.email}
						onChange={handleChange}
						label='Email'
						fullWidth
						variant='standard'
					/>
					<TextField
						margin='dense'
						name='phone'
						value={customer.phone}
						onChange={handleChange}
						label='Phone'
						fullWidth
						variant='standard'
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={editCustomer}>Save</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
