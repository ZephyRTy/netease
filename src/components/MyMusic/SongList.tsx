import { observer } from 'mobx-react';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { cookie } from '../../utils/global';
import { PlayList } from '../../utils/playList';
import { Song } from '../../utils/song';
import { user } from '../../utils/user';
import { CommentList } from './CommentList';
import { Loading } from './Loading';
import { PlaylistInfo } from './PlaylistInfo';
import './style/songList.scss';
// 歌单中歌曲列表的展示组件

const SongInfoSpan = (props: {
	name: string;
	content: string;
	song?: Song;
}) => {
	return (
		<td className={props.name}>
			<span className={`${props.name}-span`} title={props.content}>
				{props.song ? (
					<a
						href="#!"
						onClick={(e) => {
							e.preventDefault();
							//props.song?.getLyric();
						}}
					>
						{props.content}
					</a>
				) : (
					props.content
				)}
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
				song={props.track}
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

const SongList = observer((props: { active: PlayList }) => {
	const [songList, setSongList] = useState([] as Song[]);
	useEffect(() => {
		setSongList([]);
		props.active?.getSongs(cookie.get(), setSongList);
	}, [props.active, props.active?.trackIds.length]);
	return songList.length ? (
		<table className="song-detail-table">
			<SongListTitle />
			<tbody className="song-detail-list">
				{songList.map((v, i) => (
					<SongItem index={i + 1} key={v.id} track={v} />
				))}
			</tbody>
		</table>
	) : (
		<Loading />
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

export const SongListWrapper = observer(
	(props: { user: typeof user; defaultList?: boolean }) => {
		const { id } = useParams();
		const playlist = useMemo(() => {
			return props.defaultList
				? props.user.createdPlaylists[0]
				: props.user.find(id);
		}, [id, props.user.createdPlaylists.length]);
		return (
			<div className="song-detail-wrapper">
				<PlaylistInfo active={playlist!} />
				<SongList active={playlist!} />
				<CommentList active={playlist!} />
			</div>
		);
	}
);
