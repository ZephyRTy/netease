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
					return <SimArtistItem key={i} url={v.cover} />;
				})}
			</div>
		</div>
	);
};

const SimArtistItem = (props: { url: string }) => {
	const [cover, setCover] = useState('');
	useEffect(() => {
		const img = new Image();
		img.src = props.url + '?param=70y70';
		img.onload = () => {
			img.onload = null;
			setCover(img.src);
		};
		return () => {
			img.onload = null;
		};
	}, [props.url]);
	return (
		<div className="sim-artist-item">
			<img alt="" src={cover} />
		</div>
	);
};
