import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useDataFetch } from '../../utils/hooks/useAsync';
import { Track } from '../../utils/model/track';
import { SimPlaylist } from '../SimRecommend/SimPlaylist';
import { SimSong } from '../SimRecommend/SimSong';
import { SimWrapper } from '../SimRecommend/SimWrapper';
import './style/trackLayout.scss';
import { TrackWrapper } from './TrackWrapper';

export const TrackLayout = () => {
	const { id } = useParams();
	const [track, setTrack] = useState(null as unknown as Track);
	useDataFetch(
		() => {
			return Track.derive(id!);
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
