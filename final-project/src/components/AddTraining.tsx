import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import '../App.css';
import dayjs from 'dayjs';

interface Training {
	date: string;
	activity: string;
	duration: string;
	customer: string;
}

interface Props {
	saveTraining: (training: Training) => void;
}

export default function AddTraining({ saveTraining }: Props) {
	const [open, setOpen] = useState(false);
	const [training, setTraining] = useState({
		date: '',
		activity: '',
		duration: '',
		customer: '',
	});

	const link = 'http://traineeapp.azurewebsites.net/api/customers/';

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		if (event.target.name == 'customer') {
			setTraining({
				...training,
				customer: link + event.target.value,
			});
		} else {
			setTraining({ ...training, [event.target.name]: event.target.value });
		}
	};

	const AddTraining = () => {
		saveTraining(training);
		setTraining({
			date: '',
			activity: '',
			duration: '',
			customer: '',
		});
		handleClose();
	};

	return (
		<div>
			<button className='addButton' onClick={handleClickOpen}>
				+ Add
			</button>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>New Training</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin='dense'
						name='activity'
						value={training.activity}
						onChange={(event) => handleChange(event)}
						label='Activity'
						fullWidth
						variant='standard'
					/>
					<TextField
						autoFocus
						margin='dense'
						name='duration'
						value={training.duration}
						onChange={(event) => handleChange(event)}
						label='Duration(Minutes)'
						fullWidth
						variant='standard'
					/>
					<TextField
						autoFocus
						margin='dense'
						name='customer'
						value={training.customer}
						onChange={(event) => handleChange(event)}
						label='Customer ID'
						fullWidth
						variant='standard'
					/>
					<TextField
						margin='dense'
						name='date'
						value={dayjs(training.date).toISOString}
						onChange={(event) => handleChange(event)}
						label='Date and Time(YYYY-MM-DD HH:mm)'
						fullWidth
						variant='standard'
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={AddTraining}>Save</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
