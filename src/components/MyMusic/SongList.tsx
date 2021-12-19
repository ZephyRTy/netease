import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { cookie } from '../../utils/global';
import { useAsync } from '../../utils/hooks/useAsync';
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
						href={!props.song ? '#!' : `#/track/${props.song.id}`}
						onClick={(e) => {
							if (!props.song) {
								e.preventDefault();
							}
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

const SongItem = (props: { song: Song; index: number }) => {
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
							props.song.getUrl();
						}}
					></i>
				</div>
			</td>

			<SongInfoSpan
				content={props.song.name}
				name="song-detail-list-item-name"
				song={props.song}
			/>
			<SongInfoSpan
				content={props.song.duration}
				name="song-detail-list-item-duration"
			/>
			<SongInfoSpan
				content={props.song.artists}
				name="song-detail-list-item-artists"
			/>
			<SongInfoSpan
				content={props.song.album.name}
				name="song-detail-list-item-album"
			/>
		</tr>
	);
};

const SongList = observer((props: { active: PlayList }) => {
	const [songList, setSongList] = useState([] as Song[]);
	// useEffect(() => {
	// 	let flag = true;
	// 	setSongList([]);
	// 	props.active?.getSongs(cookie.get()).then((res) => {
	// 		if (flag) setSongList(res!);
	// 	});
	// 	return () => {
	// 		flag = false;
	// 	};
	// }, [props.active, props.active?.trackIds.length]);
	useAsync(
		() => {
			return props.active?.getSongs(cookie.get());
		},
		setSongList,
		[props.active, props.active?.trackIds.length],
		[]
	);
	return songList.length ? (
		<table className="song-detail-table">
			<SongListTitle />
			<tbody className="song-detail-list">
				{songList.map((v, i) => (
					<SongItem index={i + 1} key={v.id} song={v} />
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
//TODO 可访问用户未收藏的歌单
export const SongListWrapper = observer(
	(props: { user: typeof user; defaultList?: boolean }) => {
		const { id } = useParams();
		const [playlist, setPlaylist] = useState(null as unknown as PlayList);
		useEffect(() => {
			if (!props.user._infoLoaded) return;
			setPlaylist(null as unknown as PlayList);
			props.user.find(id)?.then((res) => {
				setPlaylist(
					props.defaultList ? props.user.createdPlaylists[0] : res!
				);
			});
		}, [id, props.user._infoLoaded]);
		return (
			<div className="song-detail-wrapper">
				<PlaylistInfo active={playlist!} />
				<SongList active={playlist!} />
				<CommentList active={playlist!} />
			</div>
		);
	}
);
