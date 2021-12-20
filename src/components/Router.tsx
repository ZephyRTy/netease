import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { User } from '../utils/obj/user';
import { MainContentLayout } from './MainContent/MainContent';
import { MyMusicLayout } from './MyMusic/MyMusicLayout';
import { TrackLayout } from './Track/TrackLayout';

export const Router = (props: { user: User }) => {
	return (
		<HashRouter>
			<Routes>
				<Route
					element={<MainContentLayout user={props.user} />}
					path="/"
				>
					<Route
						element={<MyMusicLayout user={props.user} />}
						path="playlist/*"
					/>
					<Route element={<TrackLayout />} path="track/:id"></Route>
				</Route>
			</Routes>
		</HashRouter>
	);
};
