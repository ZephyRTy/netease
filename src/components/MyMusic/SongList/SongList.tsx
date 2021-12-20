import axios from 'axios';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { cookie, realIP, serverPath } from '../../../utils/global';
import { useDataFetch } from '../../../utils/hooks/useAsync';
import { PlayList } from '../../../utils/obj/playList';
import { Song } from '../../../utils/obj/song';
import { SongUtil } from '../../../utils/SongUtil';
import { Loading } from '../Loading';
import '../style/songList.scss';
import { SongInfoSpan } from './SongInfoSpan';
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
							axios
								.get(
									`${serverPath}/album?id=32311&realIP=${realIP}&cookie=${cookie}`
								)
								.then(console.log)
								.catch(console.error);
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

export const SongList = observer((props: { active: PlayList }) => {
	const [songList, setSongList] = useState(null as unknown as SongUtil);
	useDataFetch(
		() => {
			return props.active?.getSongs();
		},
		setSongList,
		[props.active, props.active?.trackIds.length],
		null as unknown as SongUtil
	);
	return songList?.traverse.length ? (
		<table className="song-detail-table">
			<SongListTitle />
			<tbody className="song-detail-list">
				{songList?.traverse.map((v, i) => (
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
