import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useDataFetch } from '../../utils/hooks/useAsync';
import { Album } from '../../utils/model/album';
import { SimAlbum } from '../SimRecommend/SimAlbum';
import { AlbumWrapper } from './AlbumWrapper';

export const AlbumLayout = () => {
	const { id } = useParams();
	const [album, setAlbum] = useState(null as unknown as Album);
	useDataFetch(
		() => {
			if (!id) {
				return;
			}
			return Album.derive(id);
		},
		setAlbum,
		[id],
		null as any
	);
	return (
		<div className="artist-layout songSet-layout">
			<AlbumWrapper album={album} />
			<SimAlbum id={album?.artistId} />
		</div>
	);
};
