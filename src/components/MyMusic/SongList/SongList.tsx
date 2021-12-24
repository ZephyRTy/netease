import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { useDataFetch } from '../../../utils/hooks/useAsync';
import { HaveSongSet } from '../../../utils/interface';
import { Song } from '../../../utils/model/song';
import { SongSet } from '../../../utils/SongSet';
import { Loading } from '../Loading';
import '../style/songList.scss';
import { SongInfoSpan } from './SongInfoSpan';
export const SongItem = (props: {
	song: Song;
	index: number;
	mode?: 'artist' | 'album';
}) => {
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
					<i className="uil uil-play-circle play-icon"></i>
				</div>
			</td>

			<SongInfoSpan
				content={props.song.name}
				href={`track/${props.song.id}`}
				name="song-detail-list-item-name"
			/>
			<SongInfoSpan
				content={props.song.duration}
				name="song-detail-list-item-duration"
			/>
			{props.mode === 'artist' ? null : (
				<SongInfoSpan
					content={props.song.artists}
					href={`artist/${props.song.idOfArtist}`}
					name="song-detail-list-item-artists"
				/>
			)}
			{props.mode === 'album' ? null : (
				<SongInfoSpan
					content={props.song.album.name}
					href={`album/${props.song.album.id}`}
					name="song-detail-list-item-album"
				/>
			)}
		</tr>
	);
};

export const SongList = observer(
	(props: { active: HaveSongSet; mode?: 'artist' | 'album' }) => {
		const [songList, setSongList] = useState(null as unknown as SongSet);
		useDataFetch(
			() => {
				return props.active?.getSongs();
			},
			setSongList,
			[props.active],
			null as unknown as SongSet
		);
		return songList?.traverse.length ? (
			<table className="song-detail-table">
				<SongListTitle mode={props.mode} />
				<tbody className="song-detail-list">
					{songList?.traverse.map((v, i) => (
						<SongItem
							index={i + 1}
							key={v.id}
							mode={props.mode}
							song={v}
						/>
					))}
				</tbody>
			</table>
		) : (
			<Loading />
		);
	}
);

const SongListTitle = (props: { mode?: 'artist' | 'album' }) => {
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
				{props.mode === 'artist' ? null : (
					<th className="song-detail-list-title-artists">
						<span>歌手</span>
					</th>
				)}
				{props.mode === 'album' ? null : (
					<th className="song-detail-list-title-album">
						<span>专辑</span>
					</th>
				)}
			</tr>
		</thead>
	);
};
