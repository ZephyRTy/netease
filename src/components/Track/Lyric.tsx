import { observer } from 'mobx-react-lite';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Lyric, LyricItem } from '../../utils/lyric';
import { Timer } from '../../utils/timer';
import './style/lyric.scss';

const SingleLyric = observer((props: { lyricItem: LyricItem }) => {
	return (
		<p className={props.lyricItem.focused ? 'focus' : ''}>
			{props.lyricItem.content}
		</p>
	);
});

export const LyricList = (props: { lyric: Lyric; start: number }) => {
	const ref = useRef(null as unknown as HTMLDivElement);
	const [timer, setTimer] = useState(null as unknown as Timer);
	useLayoutEffect(() => {
		if (!props.lyric) return;
		let parent = ref.current.firstElementChild?.childNodes;
		parent?.forEach((v, i) => {
			props.lyric.item(i).pos = (v as HTMLParagraphElement).offsetTop;
		});
		setTimer(props.lyric.mount(ref.current));
		return () => {
			console.log('clear');
			timer?.end();
		};
	}, [props.lyric]);
	useEffect(() => {
		if (!timer) return;
		switch (props.start) {
			case 0:
				timer.end();
				break;
			case 1:
				timer.start();
				break;
			default:
				timer.stop();
		}
	}, [props.start]);
	return (
		<div className="lyric" ref={ref}>
			<div className="lyric-content">
				{props.lyric?.traverse.map((v, i) => (
					<SingleLyric key={i} lyricItem={v} />
				))}
			</div>
		</div>
	);
};
