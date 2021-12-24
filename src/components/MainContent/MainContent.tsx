import React, { useEffect } from 'react';
import cookies from 'react-cookies';
import { Outlet } from 'react-router-dom';
import { User } from '../../utils/model/user';
import './main-content.scss';
export const MainContentLayout = (props: { user: User }) => {
	useEffect(() => {
		if (props.user.LogStatus) {
			return;
		}
		if (cookies.load('phone')) {
			props.user.logIn(cookies.load('phone'), cookies.load('password'));
		} else {
			props.user.logIn('15527657001', 'yty7895123');
		}
		// return () => {
		// 	console.log('log out');
		// 	props.user.logOut();
		// };
	}, []);
	return (
		<div className="main-content">
			<Outlet />
		</div>
	);
};
