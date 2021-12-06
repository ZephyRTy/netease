import React from 'react';
import { user } from '../../utils/user';
import { MyMusicPage } from '../MyMusic/MyMusicPage';
import './main-content.scss';
export const MainContent = () => {
	return (
		<div className="main-content">
			<MyMusicPage user={user} />
		</div>
	);
};
