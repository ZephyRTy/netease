import axios from 'axios';
import React, { useEffect } from 'react';
import { realIP, serverPath } from '../../utils/global';
import { user } from '../../utils/user';
export const MyMusicPage = () => {
	useEffect(() => {
		axios
			.get(`${serverPath}/login/cellphone`, {
				params: {
					phone: '15527657001',
					password: 'yty7895123',
					timestamp: new Date().getTime(),
					realIP
				}
			})
			.then((res) => {
				console.log(res);
				user.LogIn(res.data.account.id, res.data.cookie);
			})
			.catch((err) => console.log(err));
		return () => {
			console.log('log out');
			user.LogOut();
		};
	}, []);
	return (
		<div>
			<button
				onClick={async () => {
					axios
						.get(
							`${serverPath}/user/playlist?uid=${user.id}&realIP=${realIP}&cookie=${user.cookie}`
						)
						.then((res) => console.log(res));
				}}
			>
				1
			</button>
		</div>
	);
};
