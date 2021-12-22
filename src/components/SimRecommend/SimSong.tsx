import React, { useState } from 'react';
import { useDataFetch } from '../../utils/hooks/useAsync';
import { Song } from '../../utils/model/song';
import { SimUtil } from '../../utils/sim';
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

export const SimSong = (props: { id: string }) => {
	const [songs, setSongs] = useState([] as Song[]);
	useDataFetch(
		() => {
			return SimUtil.getSim(props.id, 'song');
		},
		setSongs,
		[props.id],
		[] as Song[]
	);
	return songs?.length ? (
		<div className="sim-song-wrapper">
			<SimTitle title="相似的歌曲" />
			{songs?.map((v, i) => (
				<SimSongItem key={i} song={v} />
			))}
		</div>
	) : null;
};
