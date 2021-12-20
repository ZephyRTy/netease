import React from 'react';
import './style/simWrapper.scss';
export const SimWrapper = (props: { children: any }) => {
	// useEffect(() => {
	// 	let flag = true;
	// 	if (props.track) {
	// 		SimUtil.getSim(props.track, 'song').then((res) => setSimSong(res));
	// 		SimUtil.getSim(props.track, 'playlist').then((res) => {
	// 			if (flag) {
	// 				setSimPlaylist(res);
	// 			}
	// 		});
	// 	}
	// 	return () => {
	// 		flag = false;
	// 	};
	// }, [props.track]);

	return <div className="sim-wrapper">{props.children}</div>;
};
