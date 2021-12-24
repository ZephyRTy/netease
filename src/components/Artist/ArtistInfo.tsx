import React, { useEffect, useState } from 'react';
import { Artist } from '../../utils/model/artist';
import './style/artistInfo.scss';
export const ArtistInfo = (props: { artist: Artist }) => {
	const [cover, setUrl] = useState('');
	useEffect(() => {
		const img = new Image();
		img.src = props.artist?.cover + '?param=640y300';
		img.onload = () => {
			setUrl(img.src);
			img.onload = null;
		};
		return () => {
			img.onload = null;
		};
	}, [props.artist?.cover]);
	return (
		<div className="artist-info">
			<div className="artist-info-name">
				<span>{props.artist?.name}</span>
			</div>
			<div className="artist-info-cover">
				<img alt="" src={cover} />
			</div>
		</div>
	);
};
