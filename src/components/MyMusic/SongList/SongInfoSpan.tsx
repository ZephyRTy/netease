import React from 'react';
import '../style/songList.scss';
// 歌单中歌曲列表的展示组件
export const SongInfoSpan = (props: {
	name: string;
	content: string;
	href?: string;
}) => {
	return (
		<td className={props.name}>
			<span className={`${props.name}-span`} title={props.content}>
				<a
					href={`#/${props.href}`}
					onClick={(e) => {
						if (!props.href) {
							e.preventDefault();
						}
					}}
				>
					{props.content}
				</a>
			</span>
		</td>
	);
};
