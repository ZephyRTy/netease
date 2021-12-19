import React from 'react';
import { Song } from '../../utils/song';
import { SimTitle } from './SimTitle';
import './style/simSong.scss';
const SimSongItem = (props: { song: Song }) => {
	return (
		<div className="sim-song-item">
			<p className="sim-song-item-name">
				<a href={`#/track/${props.song.id}`}>{props.song.name}</a>
			</p>
			<p className="sim-song-item-artists">{props.song.artists}</p>
		</div>
	);
};

export const SimSong = (props: { song: Song[] }) => {
	return (
		<div className="sim-song-wrapper">
			<SimTitle title="相似的歌曲" />
			{props.song.map((v, i) => (
				<SimSongItem key={i} song={v} />
			))}
		</div>
	);
};
