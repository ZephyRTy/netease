import React from 'react';
import './App.scss';
import { Router } from './components/Router';
import { user } from './utils/obj/user';

function App() {
	return <Router user={user} />;
}
export default App;
