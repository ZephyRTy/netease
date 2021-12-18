import React from 'react';
import './style/simWrapper.scss';
export const SimTitle = (props: { title: string }) => {
	return (
		<div className="sim-title">
			<p>{props.title}</p>
		</div>
	);
};
