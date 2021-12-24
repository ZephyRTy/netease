import React, { useEffect, useState } from 'react';
import { useDataFetch } from '../../utils/hooks/useAsync';
import { Album } from '../../utils/model/album';
import { SimUtil } from '../../utils/sim';
import { SimTitle } from './SimTitle';
import './style/simAlbum.scss';
export const SimAlbum = (props: { id: string }) => {
	const [albums, setAlbums] = useState([] as Album[]);
	useDataFetch(
		() => {
			if (!props.id) {
				return;
			}
			return SimUtil.getSim(props.id, 'album');
		},
		setAlbums,
		[props.id],
		[]
	);
	return (
		<div className="sim-album-wrapper">
			<SimTitle title="歌手的其他专辑" />
			<div className="sim-album">
				{albums?.map((v, i) => {
					return <SimAlbumItem album={v} key={i} />;
				})}
			</div>
		</div>
	);
};

const SimAlbumItem = (props: { album: Album }) => {
	const [cover, setCover] = useState('');
	useEffect(() => {
		const img = new Image();
		img.src = props.album.cover + '?param=70y70';
		img.onload = () => {
			img.onload = null;
			setCover(img.src);
		};
		return () => {
			img.onload = null;
		};
	}, [props.album]);
	return (
		<div className="sim-album-item">
			<div className="sim-album-item-cover">
				<img alt="" src={cover} />
			</div>
			<span className="sim-album-item-name" title={props.album.name}>
				<a href={`#/album/${props.album.id}`}>{props.album.name}</a>
			</span>
		</div>
	);
};
