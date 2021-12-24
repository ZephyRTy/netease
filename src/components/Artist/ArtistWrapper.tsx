import React from 'react';
import { Artist } from '../../utils/model/artist';
import { SongList } from '../MyMusic/SongList/SongList';
import { ArtistInfo } from './ArtistInfo';

export const ArtistWrapper = (props: { artist: Artist }) => {
	return (
		<div className="artist-wrapper songSet-wrapper">
			<ArtistInfo artist={props.artist} />
			<div className="song-detail-wrapper">
				<SongList active={props.artist} mode="artist" />
			</div>
		</div>
	);
};
