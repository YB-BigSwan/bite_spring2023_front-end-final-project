import '../App.css';
import ReactTable from 'react-table';
import 'react-table/react-table.css';
import { useEffect, useState } from 'react';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';

interface Row {
	value: string;
	[key: string]: any;
}

interface Customers {
	id: string;
	firstname: string;
	lastname: string;
	streetaddress: string;
	postcode: string;
	city: string;
	email: string;
	phone: string;
	load: number;
}

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

export default function CustomerList() {
	const [customers, setCustomers] = useState<Customers[]>([]);

	useEffect(() => fetchData(), []);

	const fetchData = () => {
		fetch('https://traineeapp.azurewebsites.net/getcustomers')
			.then((response) => response.json())
			.then((responseData) => {
				Promise.all(
					responseData.map((customer: any) =>
						fetch(
							`http://traineeapp.azurewebsites.net/api/customers/${customer.id}/trainings`
						)
							.then((response) => response.json())
							.then((customerData) => ({
								id: customer.id,
								firstname: customer.firstname,
								lastname: customer.lastname,
								streetaddress: customer.streetaddress,
								postcode: customer.postcode,
								city: customer.city,
								email: customer.email,
								phone: customer.phone,
								load: customerData.content.length,
							}))
					)
				).then((formattedCustomers) => setCustomers(formattedCustomers));
			});
	};

	const saveCustomer = (customer: Customer) => {
		fetch('http://traineeapp.azurewebsites.net/api/customers', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(customer),
		})
			.then((response) => fetchData())
			.catch((err) => console.error(err));
	};

	const deleteCustomer = (id: string) => {
		if (window.confirm('Are you sure?')) {
			fetch(`http://traineeapp.azurewebsites.net/api/customers/${id}`, {
				method: 'DELETE',
			})
				.then((response) => fetchData())
				.catch((err) => console.error(err));
			alert('Customer deleted!');
		} else {
			alert('Nothing deleted.');
		}
	};

	const updateCustomer = (customer: Customer, id: any) => {
		fetch(`http://traineeapp.azurewebsites.net/api/customers/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(customer),
		})
			.then((response) => fetchData())
			.catch((err) => console.error(err));
	};

	const columns = [
		{ Header: 'First Name', accessor: 'firstname' },
		{ Header: 'Last Name', accessor: 'lastname' },

		{
			width: 200,
			Header: 'Street Address',
			accessor: 'streetaddress',
		},
		{ Header: 'City', accessor: 'city' },
		{ Header: 'Post Code', accessor: 'postcode' },
		{ Header: 'Email', accessor: 'email' },
		{ Header: 'Phone', accessor: 'phone' },
		{
			Header: 'Training Load',
			accessor: 'load',
			Cell: (row: Row) => (
				<div
					className={
						row.original.load <= 1
							? 'low'
							: row.original.load == 2
							? 'medium'
							: row.original.load >= 3
							? 'high'
							: ''
					}>
					{row.original.load <= 1
						? 'Low'
						: row.original.load == 2
						? 'Medium'
						: row.original.load >= 3
						? 'High'
						: ''}
				</div>
			),
		},
		{
			sortable: false,
			filterable: false,
			width: 80,
			Cell: (row: Row) => (
				<EditCustomer updateCustomer={updateCustomer} id={row.original} />
			),
		},
		{
			sortable: false,
			filterable: false,
			width: 100,
			accessor: 'id',
			Cell: (row: Row) => (
				<button className='delete' onClick={() => deleteCustomer(row.value)}>
					Delete
				</button>
			),
		},
	];
	return (
		<div className='twrapper'>
			<div className='thead'>
				<h1 className='thead'>Client Info</h1>
				<AddCustomer saveCustomer={saveCustomer} />
			</div>

			<ReactTable
				filterable={true}
				sortable={true}
				data={customers}
				columns={columns}
			/>
		</div>
	);
}
