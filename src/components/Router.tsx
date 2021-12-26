import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { User } from '../utils/model/user';
import { AlbumLayout } from './Album/AlbumLayout';
import { ArtistLayout } from './Artist/ArtistLayout';
import { IndexPage } from './Discovery/Index/IndexPage';
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
					<Route element={<ArtistLayout />} path="artist/:id"></Route>
					<Route element={<AlbumLayout />} path="album/:id"></Route>
				</Route>
				<Route element={<IndexPage user={props.user} />} index />
			</Routes>
		</HashRouter>
	);
};
