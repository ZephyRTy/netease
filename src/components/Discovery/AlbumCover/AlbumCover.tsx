import React from 'react';
import { getSizeImage } from '../../../utils/format';
import './style/AlbumCover.scss';

export const AlbumCover = (props: { info: any }) => {
	return (
		<div className="AlbumCoverWrapper">
			<div className="AlbumCoverWrapper-album-image">
				<img
					alt={props.info.name}
					src={getSizeImage(props.info.picUrl, 140)}
				/>
			</div>
			<div className="AlbumCoverWrapper-album-name">
				<a href={`#/album/${props.info.id}`}>{props.info.name}</a>
			</div>
			<div className="AlbumCoverWrapper-artist">
				{props.info.artist.name}
			</div>
		</div>
	);
};
