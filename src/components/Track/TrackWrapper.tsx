import React from 'react';
import { Track } from '../../utils/track';
import { CommentList } from '../MyMusic/CommentList';
import './style/track.scss';
import { TrackInfo } from './TrackInfo';
export const TrackWrapper = (props: { track: Track }) => {
	return (
		<div className="track-wrapper">
			<TrackInfo track={props.track} />
			<CommentList active={props.track} />
		</div>
	);
};
