import React, { useEffect, useState } from 'react';
import { Lyric } from '../../utils/lyric';
import { Track } from '../../utils/track';
import { LyricList } from './Lyric';

const TrackInfoSpan = (props: {
	content?: string;
	name: string;
	children?: any;
}) => {
	return (
		<div className={props.name}>
			{props.children ? (
				props.children
			) : (
				<span className={`${props.name}-span`}>{props.content}</span>
			)}
		</div>
	);
};

const TrackGeneralInfo = (props: { track: Track }) => {
	return (
		<div className="track-general-info">
			<TrackInfoSpan name="track-info-name">
				<i className="uil uil-label-alt"></i>
				<span className={'track-info-name-span'}>
					{props.track?.name}
				</span>
			</TrackInfoSpan>
			<TrackInfoSpan name="track-info-artists">
				<span>{'歌手:  '}</span>
				<span>{props.track?.artists}</span>
			</TrackInfoSpan>
			<TrackInfoSpan name="track-info-album">
				<span>{'专辑:  '}</span>
				<span>{props.track?.album.name}</span>
			</TrackInfoSpan>
		</div>
	);
};

export const TrackInfo = (props: { track: Track }) => {
	const [lyric, setLyrics] = useState(null as unknown as Lyric);
	const [cover, setCover] = useState('');
	useEffect(() => {
		if (props.track) {
			props.track.getLyric(setLyrics);
			props.track.getCover(setCover);
		}
	}, [props.track]);
	return (
		<div className="track-wrapper-1">
			<div className="track-cover">
				<img alt="" src={cover}></img>
			</div>
			<div className="track-info">
				<TrackGeneralInfo track={props.track} />
				<LyricList lyric={lyric} />
			</div>
		</div>
	);
};
