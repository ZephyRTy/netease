import React from 'react';
import './style/SongCover.scss';
import { getCount, getSizeImage } from '../../../utils/format';

export const SongCover = (
	props:{ info: any, songList: any, width: 140 }
) => {
    const picUrl =
		(props.info && (props.info.picUrl || props.info.coverImgUrl)) ||
		(props.songList && props.songList.coverImgUrl);
	// playCount 播放次数
	const playCount =
		(props.info && props.info.playCount) ||
		(props.songList && props.songList.playCount) ||
		0;
	// name
	const name =
		(props.info && props.info.name) ||
		(props.songList && props.songList.name);
	// nickname
	const nickname =
		(props.info && props.info.copywriter) ||
		(props.songList && props.songList.creator.nickname);
	// id
	const songInfoId =
		(props.info && props.info.id) || (props.songList && props.songList.id);


    
    return (
		<div className="SongCoverWrapper">
			<div className="SongCoverWrapper-cover-wrapper">
				<img src={getSizeImage(picUrl, 140)} alt="" className="SongCoverWrapper-img" />
				<div className="SongCoverWrapper-cover-mask">
					<div className="SongCoverWrapper-cover-mask-bottom-bar">
						<span>
							<i className="SongCoverWrapper-cover-mask-bottom-bar-erji"></i>
							{getCount(playCount)}
						</span>
						<i className="SongCoverWrapper-cover-mask-bottom-bar-play"></i>
					</div>
				</div>
			</div>
			<div className="SongCoverWrapper-cover-title">by-{name}</div>
			<div className="SongCoverWrapper-cover-source">by {(props.info && (props.info as any).copywriter)||nickname}</div>
		</div>
	);
};
