import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import Img from '../../../static/cover.jpg';
import { PlayList } from '../../../utils/model/playList';
import '../style/playlistInfo.scss';

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

export const PlaylistInfo = observer((props: { active: PlayList }) => {
	const [url, setUrl] = useState('');
	useEffect(() => {
		setUrl('');
		props.active?.getCover(setUrl);
	}, [props.active]);
	return (
		<div className="playlist-info">
			<div className="playlist-info-wrapper">
				<PlaylistCover ImgUrl={url} />
				<div className="playlist-info-intro">
					<span className="playlist-info-name">
						{props.active?.name}
					</span>
					<p className="playlist-info-description">
						{props.active?.description}
					</p>
				</div>
			</div>
		</div>
	);
});
