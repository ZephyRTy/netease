import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useDataFetch } from '../../utils/hooks/useAsync';
import { Track } from '../../utils/obj/track';
import { SimPlaylist } from '../SimRecommend/SimPlaylist';
import { SimSong } from '../SimRecommend/SimSong';
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
	useDataFetch(
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
			<SimWrapper>
				<SimSong id={track?.id} />
				<SimPlaylist id={track?.id} />
			</SimWrapper>
		</div>
	);
};
