import React from 'react';
import { Album } from '../../utils/model/album';
import { CommentList } from '../MyMusic/CommentList';
import { SongList } from '../MyMusic/SongList/SongList';
import { AlbumInfo } from './AlbumInfo';

export const AlbumWrapper = (props: { album: Album }) => {
	return (
		<div className="album-wrapper songSet-wrapper">
			<AlbumInfo album={props.album} />
			<div className="song-detail-wrapper">
				<SongList active={props.album} mode="album" />
			</div>
			<CommentList active={props.album} />
		</div>
	);
};
