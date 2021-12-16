import React, { useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { user } from '../../utils/user';
import { PlaylistsWrapper } from './Playlists';
import { SongListWrapper } from './SongList';
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
			<PlaylistsWrapper user={user} />
			<HashRouter>
				<Routes>
					<Route
						element={<SongListWrapper user={props.user} />}
						path="/"
					>
						<Route
							element={
								<SongListWrapper
									defaultList
									user={props.user}
								/>
							}
							path="playlist"
						>
							<Route
								element={<SongListWrapper user={props.user} />}
								path=":id"
							></Route>
						</Route>
					</Route>
				</Routes>
			</HashRouter>
		</div>
	);
};
