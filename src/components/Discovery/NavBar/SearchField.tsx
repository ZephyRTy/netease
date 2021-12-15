import React from 'react';
import './style/SearchField.scss';

export const SearchField = () => {
	return (
		<div className="filter-list">
			<input
				onKeyDown={(e) => {
					if (e.key == 'Enter') {
						console.log('search');
					}
				}}
				placeholder="音乐/视频/电台/用户"
				type="text"
			/>
		</div>
	);
}


