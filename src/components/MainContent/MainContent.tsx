import React from 'react';
import { Outlet } from 'react-router-dom';
import { User } from '../../utils/model/user';
import './main-content.scss';
export const MainContentLayout = (props: { user: User }) => {
	// useEffect(() => {
	// 	if (props.user.LogStatus) {
	// 		return;
	// 	}
	// 	if (cookies.load('phone')) {
	// 		props.user.logIn(cookies.load('phone'), cookies.load('password'));
	// 	} else {
	// 		props.user.logIn('15527657001', 'yty7895123');
	// 	}
	// }, []);
	return (
		<div className="main-content">
			<Outlet />
		</div>
	);
};
