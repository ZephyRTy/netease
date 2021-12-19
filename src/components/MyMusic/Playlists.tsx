import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { PlayList } from '../../utils/playList';
import { user } from '../../utils/user';
import './style/playlist.scss';

// 歌单列表的展示组件

const PlaylistItem = (props: { playlist: PlayList }) => {
	return (
		<li className="playlist-item">
			<div className="playlist-item-content">
				<img
					alt=""
					className="playlist-item-cover"
					src={props.playlist.cover}
				/>
				<div className="playlist-item-info">
					<span className="playlist-item-info-name">
						<a
							className="playlist-item-info-link"
							href={`#/playlist/${props.playlist.id}`}
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

const Playlist = observer((props: { playlists: PlayList[]; title: string }) => {
	const [open, setOpen] = useState(true);
	const [flag, setFlag] = useState(false);
	useEffect(() => {
		setFlag(!flag);
	}, [props.playlists.length]);
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
				{props.playlists.map((v, i) => (
					<PlaylistItem key={i} playlist={v} />
				))}
			</ul>
		</div>
	);
});

export const PlaylistsWrapper = observer((props: { user: typeof user }) => {
	useEffect(() => {
		if (props.user._LogStatus && !props.user.createdPlaylistCount) {
			props.user.getAllPlaylists();
		}
		return () => {};
	}, [props.user._LogStatus]);
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
