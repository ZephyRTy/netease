import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { active, cookie } from '../../utils/global';
import { PlayList } from '../../utils/playList';
import { Song } from '../../utils/song';
import { CommentList } from './CommentList';
import { Loading } from './Loading';
import { PlaylistInfo } from './PlaylistInfo';
import './style/songList.scss';

// 歌单中歌曲列表的展示组件

const SongInfoSpan = (props: { name: string; content: string }) => {
	return (
		<td className={props.name}>
			<span className={`${props.name}-span`} title={props.content}>
				{props.content}
			</span>
		</td>
	);
};

const SongItem = (props: { track: Song; index: number }) => {
	return (
		<tr
			className={`song-detail-list-item ${
				props.index % 2 ? 'odd' : 'even'
			}`}
		>
			<td className="song-detail-list-item-index">
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<span className="song-detail-list-item-index-span">
						{props.index}
					</span>
					<i
						className="uil uil-play-circle play-icon"
						onClick={() => {
							props.track.getUrl();
						}}
					></i>
				</div>
			</td>

			<SongInfoSpan
				content={props.track.name}
				name="song-detail-list-item-name"
			/>
			<SongInfoSpan
				content={props.track.duration}
				name="song-detail-list-item-duration"
			/>
			<SongInfoSpan
				content={props.track.artists}
				name="song-detail-list-item-artists"
			/>
			<SongInfoSpan
				content={props.track.album.name}
				name="song-detail-list-item-album"
			/>
		</tr>
	);
};

const SongList = observer((props: { active: { activePlaylist: PlayList } }) => {
	const [songList, setSongList] = useState([] as Song[]);
	useEffect(() => {
		setSongList([]);
		props.active.activePlaylist?.getTracks(cookie.get(), setSongList);
	}, [props.active.activePlaylist]);
	return (
		<tbody className="song-detail-list">
			{songList.length ? (
				songList.map((v, i) => (
					<SongItem index={i + 1} key={v.id} track={v} />
				))
			) : (
				<Loading />
			)}
		</tbody>
	);
});

const SongListTitle = () => {
	return (
		<thead>
			<tr>
				<th className="song-detail-list-title-index"></th>
				<th className="song-detail-list-title-name">
					<span>歌曲标题</span>
				</th>
				<th className="song-detail-list-title-duration">
					<span>时长</span>
				</th>
				<th className="song-detail-list-title-artists">
					<span>歌手</span>
				</th>
				<th className="song-detail-list-title-album">
					<span>专辑</span>
				</th>
			</tr>
		</thead>
	);
};

export const SongListWrapper = () => {
	return (
		<div className="song-detail-wrapper">
			<PlaylistInfo active={active} />
			<table className="song-detail-table">
				<SongListTitle />
				<SongList active={active} />
			</table>
			<CommentList active={active} />
		</div>
	);
};
