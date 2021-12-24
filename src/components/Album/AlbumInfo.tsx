import React, { useEffect, useState } from 'react';
import { Album } from '../../utils/model/album';
import './style/AlbumInfo.scss';
export const AlbumInfo = (props: { album: Album }) => {
	const [cover, setUrl] = useState('');
	useEffect(() => {
		const img = new Image();
		img.src = props.album?.cover;
		img.onload = () => {
			setUrl(img.src);
			img.onload = null;
		};
		return () => {
			img.onload = null;
		};
	}, [props.album?.cover]);
	return (
		<div className="album-info">
			<div className="album-info-cover">
				<img alt="" src={cover} />
			</div>
			<div className="album-info-name">
				<span>{props.album?.name}</span>
			</div>
		</div>
	);
};
