import React, { useEffect, useState } from 'react';
import { Lyric } from '../../utils/model/lyric';
import { Track } from '../../utils/model/track';
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
				<span>{props.track?.album?.name}</span>
			</TrackInfoSpan>
		</div>
	);
};

export const TrackInfo = (props: { track: Track }) => {
	const [lyric, setLyrics] = useState(null as unknown as Lyric);
	const [cover, setCover] = useState('');
	const [start, setStart] = useState(0); // 0表示停止或未开始，1表示正在播放，2表示暂停
	useEffect(() => {
		let flag = true;
		if (props.track) {
			props.track?.getLyric().then((res) => {
				if (flag) {
					setLyrics(res);
				}
			});
			props.track?.getCover(setCover);
		}
		return () => {
			flag = false;
		};
	}, [props.track]);
	return (
		<div className="track-wrapper-1">
			<div className="track-cover">
				<img alt="" src={cover}></img>
			</div>
			<div className="track-info">
				<TrackGeneralInfo track={props.track} />
				<button
					onClick={() => {
						setStart(1);
					}}
				>
					播放
				</button>
				<button
					onClick={() => {
						setStart(2);
					}}
				>
					暂停
				</button>
				<button
					onClick={() => {
						setStart(0);
					}}
				>
					end
				</button>
				<LyricList lyric={lyric} start={start} />
			</div>
		</div>
	);
};
