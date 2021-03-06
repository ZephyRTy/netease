import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { user } from '../../utils/model/user';
import { PlaylistsWrapper } from './Playlists/Playlists';
import { SongListWrapper } from './SongList/SongListWrapper';
import './style/myMusic.scss';
export const MyMusicLayout = observer((props: { user: typeof user }) => {
	useEffect(() => {
		props.user.getAllPlaylists();
	}, []);
	return (
		<>
			<div className="myMusic-container">
				<PlaylistsWrapper user={props.user} />
				<Routes>
					<Route
						element={<SongListWrapper user={props.user} />}
						path=":id"
					/>
					<Route
						element={<SongListWrapper user={props.user} />}
						index
					/>
				</Routes>
			</div>
		</>
	);
});
