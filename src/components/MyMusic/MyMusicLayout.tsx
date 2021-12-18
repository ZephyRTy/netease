import { observer } from 'mobx-react-lite';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { user } from '../../utils/user';
import { PlaylistsWrapper } from './Playlists';
import { SongListWrapper } from './SongList';
import './style/myMusic.scss';
export const MyMusicLayout = observer((props: { user: typeof user }) => {
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
