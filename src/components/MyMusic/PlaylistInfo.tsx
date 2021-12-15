import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import Img from '../../static/cover.jpg';
import { PlayList } from '../../utils/playList';
import './style/playlistInfo.scss';

// 歌单页面中最上方的歌单信息

const PlaylistCover = (props: { ImgUrl: string }) => {
	return (
		<div className="playlist-info-cover-wrapper">
			<img
				alt=""
				className="playlist-info-cover"
				src={props.ImgUrl || Img}
			></img>
		</div>
	);
};

export const PlaylistInfo = observer(
	(props: { active: { activePlaylist: PlayList } }) => {
		const [url, setUrl] = useState('');
		useEffect(() => {
			setUrl('');
			props.active.activePlaylist?.getCover(setUrl);
		}, [props.active.activePlaylist]);
		return (
			<div className="playlist-info">
				<div className="playlist-info-wrapper">
					<PlaylistCover ImgUrl={url} />
					<div className="playlist-info-intro">
						<span className="playlist-info-name">
							{props.active.activePlaylist?.name}
						</span>
						<p className="playlist-info-description">
							{props.active.activePlaylist?.description}
						</p>
					</div>
				</div>
			</div>
		);
	}
);
