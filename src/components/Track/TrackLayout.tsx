import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Track } from '../../utils/track';
import { SimWrapper } from '../SimRecommand/SimWrapper';
import './style/trackLayout.scss';
import { TrackWrapper } from './TrackWrapper';
export const TrackLayout = () => {
	const { id } = useParams();
	const [track, setTrack] = useState(null as unknown as Track);
	useEffect(() => {
		setTrack(null as any);
		Track.createTrack(id!, setTrack);
	}, [id]);
	return (
		<div className="track-layout">
			<TrackWrapper track={track} />
			<SimWrapper track={track} />
		</div>
	);
};
