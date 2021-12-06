import axios from 'axios';
import React, { useEffect } from 'react';
import { realIP, serverPath } from '../../utils/global';
import { user } from '../../utils/user';
import { PlaylistsContainer } from './Playlists';
import './style/myMusic.scss';
export const MyMusicPage = (props: { user: typeof user }) => {
	useEffect(() => {
		props.user.LogIn('15527657001', 'yty7895123');
		return () => {
			console.log('log out');
			props.user.LogOut();
		};
	}, []);
	return (
		<div className="myMusic-container">
			<button
				onClick={async () => {
					if (props.user.cookie.length < 1) {
						return;
					}
					axios
						.get(
							`${serverPath}/playlist/detail?id=408046442&realIP=${realIP}&cookie=${user.cookie}`
						)
						.then((res) => console.log(res));
				}}
				style={{ position: 'absolute' }}
			>
				1
			</button>
			<PlaylistsContainer user={user} />
		</div>
	);
};
