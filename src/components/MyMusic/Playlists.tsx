import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { PlayList } from '../../utils/playList';
import { user } from '../../utils/user';
import './style/playlist.scss';
const PlaylistItem = (props: { playlist: PlayList }) => {
	return (
		<li className="playlist-item">
			<div className="playlist-item-content">
				<img
					alt=""
					className="playlist-item-cover"
					src={props.playlist.coverImgUrl}
				/>
			</div>
		</li>
	);
};
const Playlist = (props: { playlists: PlayList[] }) => {
	const [open, setOpen] = useState(true);
	return (
		<div>
			<span onClick={() => setOpen((v) => !v)}>title</span>
			<ul className={'playlist' + (open ? ' playlist-open' : '')}>
				{props.playlists.map((v) => (
					<PlaylistItem key={v.id} playlist={v} />
				))}
			</ul>
		</div>
	);
};
export const PlaylistsContainer = observer((props: { user: typeof user }) => {
	return (
		<div className="playlist-container">
			{props.user._infoLoaded ? (
				<Playlist playlists={props.user.playLists} />
			) : null}
		</div>
	);
});
