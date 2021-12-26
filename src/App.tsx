import React from 'react';
import './App.scss';
import { Navbar } from './components/Discovery/NavBar/Navbar';
import { Router } from './components/Router';
import './style/global.scss';
import './style/SongSetLayout.scss';
import { user } from './utils/model/user';
function App() {
	return (
		<>
			<Navbar />
			<Router user={user} />
		</>
	);
}
export default App;
