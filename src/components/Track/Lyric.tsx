import React from 'react';
import { Lyric } from '../../utils/lyric';
import './style/lyric.scss';
export const LyricList = (props: { lyric: Lyric }) => {
	return (
		<div className="lyric">
			<div className="lyric-content">
				{props.lyric?.traverse.map((v, i) => (
					<p key={i}>{v.content}</p>
				))}
			</div>
		</div>
	);
};
