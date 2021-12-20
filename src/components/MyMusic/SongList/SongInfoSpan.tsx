import React from 'react';
import { Song } from '../../../utils/obj/song';
import '../style/songList.scss';
// 歌单中歌曲列表的展示组件
export const SongInfoSpan = (props: {
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
