import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useAsync } from '../../utils/hooks/useAsync';
import { Track } from '../../utils/track';
import { SimWrapper } from '../SimRecommend/SimWrapper';
import './style/trackLayout.scss';
import { TrackWrapper } from './TrackWrapper';

export const TrackLayout = () => {
	const { id } = useParams();
	const [track, setTrack] = useState(null as unknown as Track);
	// useEffect(() => {
	// 	let flag = true;
	// 	setTrack(null as any);
	// 	Track.createTrack(id!).then((res) => {
	// 		if (flag) setTrack(res!);
	// 	});
	// 	return () => {
	// 		flag = false;
	// 	};
	// }, [id]);
	useAsync(
		() => {
			return Track.createTrack(id!);
		},
		setTrack,
		[id],
		null
	);
	return (
		<div className="track-layout">
			<TrackWrapper track={track} />
			<SimWrapper track={track} />
		</div>
	);
};
