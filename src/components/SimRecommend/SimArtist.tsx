import React, { useEffect, useState } from 'react';
import { useDataFetch } from '../../utils/hooks/useAsync';
import { Artist } from '../../utils/model/artist';
import { SimUtil } from '../../utils/sim';
import { SimTitle } from './SimTitle';
import './style/simArtist.scss';
export const SimArtist = (props: { id: string }) => {
	const [artists, setArtists] = useState([] as Artist[]);
	useDataFetch(
		() => {
			if (!props.id) {
				return;
			}
			return SimUtil.getSim(props.id, 'artist');
		},
		setArtists,
		[props.id],
		[]
	);
	return (
		<div className="sim-artist-wrapper">
			<SimTitle title="相似的歌手" />
			<div className="sim-artist">
				{artists.map((v, i) => {
					return <SimArtistItem artist={v} key={i} />;
				})}
			</div>
		</div>
	);
};

const SimArtistItem = (props: { artist: Artist }) => {
	const [cover, setCover] = useState('');
	useEffect(() => {
		const img = new Image();
		img.src = props.artist.cover + '?param=70y70';
		img.onload = () => {
			img.onload = null;
			setCover(img.src);
		};
		return () => {
			img.onload = null;
		};
	}, [props.artist]);
	return (
		<div className="sim-artist-item">
			<img alt="" src={cover} />
			<span title={props.artist.name}>
				<a href={`#/artist/${props.artist.id}`}>{props.artist.name}</a>
			</span>
		</div>
	);
};
