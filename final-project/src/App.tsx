import './App.css';
import { AppBar, Toolbar } from '@material-ui/core';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './components/Home';
import CustomerList from './components/CustomerList';
import MyInfo from './components/MyInfo';
import TrainingList from './components/TrainingList';

function App() {
	return (
		<>
			<AppBar position='fixed'>
				<Toolbar
					className='toolBar'
					style={{ justifyContent: 'space-between' }}>
					<nav>
						<Link to='/'>
							<button className='home' type='button'>
								MyTraining
							</button>
						</Link>

						<Link to='/clients'>
							<button className='navButton' type='button'>
								Client Info
							</button>
						</Link>

						<Link to='/training'>
							<button className='navButton' type='button'>
								Training Info
							</button>
						</Link>
					</nav>
				</Toolbar>
			</AppBar>

			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/clients' element={<CustomerList />} />
				<Route path='/training' element={<TrainingList />} />
				<Route path='/my-info' element={<MyInfo />} />
			</Routes>
		</>
	);
}

export default App;
