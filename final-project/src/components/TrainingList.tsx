import '../App.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import AddTraining from './AddTraining';
import EditTraining from './EditTraining';

interface Row {
	value: string;
	[key: string]: any;
}

interface TrainingData {
	activity: string;
	duration: string;
	customerFName: string;
	customerLName: string;
	date: string;
	time: string;
}

interface Training {
	date: string;
	activity: string;
	duration: string;
	customer: string;
}

export default function TrainingList() {
	const [trainings, setTrainings] = useState<TrainingData[]>([]);

	useEffect(() => fetchData(), []);

	const fetchData = () => {
		fetch('https://traineeapp.azurewebsites.net/api/trainings')
			.then((response) => response.json())
			.then((responseData) => {
				Promise.all(
					responseData.content.map((training: any, id: number) =>
						fetch(responseData.content[id].links[2].href)
							.then((response) => response.json())
							.then((customerData) => ({
								activity: training.activity,
								duration: training.duration,
								date: dayjs(training.date).format('DD-MM-YYYY'),
								time: dayjs(training.date).format('HH:mm'),
								customerFName: customerData.firstname,
								customerLName: customerData.lastname,
							}))
					)
				)
					.then((formattedTrainings) => setTrainings(formattedTrainings))
					.catch((error) => console.error(error));
			});
	};

	const saveTraining = (training: Training) => {
		fetch('http://traineeapp.azurewebsites.net/api/trainings', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(training),
		})
			.then((response) => fetchData())
			.catch((err) => console.error(err));
	};

	const deleteTraining = (id: string) => {
		if (window.confirm('Are you sure?')) {
			fetch(`http://traineeapp.azurewebsites.net/api/trainings/${id}`, {
				method: 'DELETE',
			})
				.then((response) => fetchData())
				.catch((err) => console.error(err));
			alert('Customer deleted!');
		} else {
			alert('Nothing deleted.');
		}
	};

	const updateTraining = (training: TrainingData, id: any) => {
		fetch(`http://traineeapp.azurewebsites.net/api/trainings/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(training),
		})
			.then((response) => fetchData())
			.catch((err) => console.error(err));
	};

	const columns = [
		{ Header: 'Activity', accessor: 'activity' },
		{
			Header: 'Duration',
			accessor: 'duration',
			Cell: (row: Row) => <div>{row.original.duration + ' '}minutes</div>,
		},
		{ Header: 'First Name', accessor: 'customerFName' },
		{ Header: 'Last Name', accessor: 'customerLName' },
		{ Header: 'Date', accessor: 'date' },
		{ Header: 'Time', accessor: 'time' },
		{
			sortable: false,
			filterable: false,
			width: 80,
			Cell: (row: Row) => (
				<EditTraining updateCustomer={updateTraining} id={row.original} />
			),
		},
		{
			sortable: false,
			filterable: false,
			width: 100,
			Cell: (row: Row) => (
				<button className='delete' onClick={() => deleteTraining(row.value)}>
					Delete
				</button>
			),
		},
	];

	return (
		<div className='twrapper'>
			<div className='thead'>
				<h1 className='thead'>Training Info</h1>
				<AddTraining saveTraining={saveTraining} />
			</div>
			<ReactTable
				filterable={true}
				sortable={true}
				data={trainings}
				columns={columns}
			/>
		</div>
	);
}
