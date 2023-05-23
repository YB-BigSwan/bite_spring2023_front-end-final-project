import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import '../App.css';

export default function EditTraining(props: any) {
	const [open, setOpen] = useState(false);
	const [training, setTraining] = useState({
		activity: '',
		duration: '',
		customerFName: '',
		customerLName: '',
		date: '',
		time: '',
	});

	const handleOpen = () => {
		setTraining({
			activity: props.id.activity,
			duration: props.id.duration,
			customerFName: props.id.customerFName,
			customerLName: props.id.customerLName,
			date: props.id.date,
			time: props.id.time,
		});
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setTraining({ ...training, [event.target.name]: event.target.value });
	};

	const editTraining = () => {
		props.updateCustomer(training, props.id.id);
		handleClose();
	};

	return (
		<div>
			<button className='edit' onClick={handleOpen}>
				Edit
			</button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Edit Training</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin='dense'
						name='activity'
						value={training.activity}
						onChange={handleChange}
						label='Activity'
						fullWidth
						variant='standard'
					/>
					<TextField
						autoFocus
						margin='dense'
						name='duration'
						value={training.duration}
						onChange={handleChange}
						label='Duration'
						fullWidth
						variant='standard'
					/>
					<TextField
						autoFocus
						margin='dense'
						name='customerFName'
						value={training.customerFName}
						onChange={handleChange}
						label='First Name'
						fullWidth
						variant='standard'
					/>
					<TextField
						margin='dense'
						name='customerLName'
						value={training.customerLName}
						onChange={handleChange}
						label='Last Name'
						fullWidth
						variant='standard'
					/>
					<TextField
						margin='dense'
						name='date'
						value={training.date}
						onChange={handleChange}
						label='Date'
						fullWidth
						variant='standard'
					/>
					<TextField
						margin='dense'
						name='time'
						value={training.time}
						onChange={handleChange}
						label='Time'
						fullWidth
						variant='standard'
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={editTraining}>Save</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
