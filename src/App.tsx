import React from 'react';
import './App.scss';
import { Router } from './components/Router';
import './style/SongSetLayout.scss';
import { user } from './utils/model/user';
import { LoginForm } from './components/Discovery/Login-form/LoginForm';
function App() {
	return <LoginForm />
}
export default App;
