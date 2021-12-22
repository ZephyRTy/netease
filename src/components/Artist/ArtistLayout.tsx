import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useDataFetch } from '../../utils/hooks/useAsync';
import { Artist } from '../../utils/model/artist';
import { SimArtist } from '../SimRecommend/SimArtist';
import { SimWrapper } from '../SimRecommend/SimWrapper';
import { ArtistWrapper } from './ArtistWrapper';
import './style/artistLayout.scss';
export const ArtistLayout = () => {
	const { id } = useParams();
	const [artist, setArtist] = useState(null as unknown as Artist);
	useDataFetch(
		() => {
			if (!id) {
				return;
			}
			return Artist.derive(id);
		},
		setArtist,
		[id],
		null as any
	);
	return (
		<div className="artist-layout">
			<ArtistWrapper artist={artist} />
			<SimWrapper>
				<SimArtist id={artist?.id} />
			</SimWrapper>
		</div>
	);
};
