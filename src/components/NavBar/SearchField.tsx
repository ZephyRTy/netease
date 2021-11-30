import React from 'react';
import './style/SearchField.scss';

function SearchField() {
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

export default SearchField;
