import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { User } from '../../utils/model/user';
import './main-content.scss';

export const MainContentLayout = (props: { user: User }) => {
	useEffect(() => {
		props.user.logIn('15527657001', 'yty7895123');
		return () => {
			console.log('log out');
			props.user.logOut();
		};
	}, []);
	return (
		<div className="main-content">
			<Outlet />
		</div>
	);
};
