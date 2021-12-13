import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { cookie } from '../../utils/global';
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
				<div className="playlist-item-info">
					<span className="playlist-item-info-name">
						<a
							className="playlist-item-info-link"
							href="javascript:void(0)"
							onClick={() => {
								props.playlist.getTracks(cookie.get());
							}}
						>
							{props.playlist.name}
						</a>
					</span>
					<span className="playlist-item-info-length">
						{`${props.playlist.length}首`}
					</span>
				</div>
			</div>
		</li>
	);
};
const Playlist = (props: { playlists: PlayList[]; title: string }) => {
	const [open, setOpen] = useState(true);
	return (
		<div>
			<div
				className={
					'playlist-title' + (open ? ' playlist-title-open' : '')
				}
			>
				<span
					className={'playlist-title-span'}
					onClick={() => setOpen((v) => !v)}
				>
					{props.title}
				</span>
			</div>
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
				<>
					<Playlist
						playlists={props.user.createdPlaylists}
						title="创建的歌单"
					/>
					<Playlist
						playlists={props.user.subPlaylists}
						title="收藏的歌单"
					/>
				</>
			) : null}
		</div>
	);
});
