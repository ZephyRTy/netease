import React, { useEffect, useState } from 'react';
import { useDataFetch } from '../../utils/hooks/useAsync';
import { PlayList } from '../../utils/obj/playList';
import { SimUtil } from '../../utils/sim';
import { SimTitle } from './SimTitle';
import './style/simPlaylist.scss';
const SimPlaylistItem = (props: { playlist: PlayList }) => {
	const [cover, setCover] = useState('');
	useEffect(() => {
		props.playlist.getCover(setCover);
	}, [props.playlist]);
	return (
		<div className="sim-playlist-item">
			<div className="sim-playlist-item-cover">
				<img alt="" src={cover} />
			</div>
			<div className="sim-playlist-item-info">
				<span className="sim-playlist-item-info-name">
					<a href={`#/playlist/${props.playlist.id}`}>
						{props.playlist.name}
					</a>
				</span>
				<span className="sim-playlist-item-info-creator">
					<span style={{ color: 'gray' }}>{'By   '}</span>
					<span className="sim-playlist-item-info-creator-name">
						{props.playlist.creator}
					</span>
				</span>
			</div>
		</div>
	);
};

export const SimPlaylist = (props: { id: string }) => {
	const [playlists, setPlaylists] = useState([] as PlayList[]);
	useDataFetch(
		() => {
			return SimUtil.getSim(props.id, 'playlist');
		},
		setPlaylists,
		[props.id]
	);
	return (
		<div className="sim-playlist-wrapper">
			<SimTitle title="相似的歌单" />
			{playlists?.map((v, i) => (
				<SimPlaylistItem key={i} playlist={v} />
			))}
		</div>
	);
};
