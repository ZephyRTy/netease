import React from 'react';
import { Carouse } from '../Carouse/Carouse';
import { HotRecommend } from '../HotRecommend/HotRecommend';
import { LoginForm } from '../Login-form/LoginForm';
import { NewAlbum } from '../NewAlbum/NewAlbum';
import { Ranking } from '../Ranking/Ranking';
export const IndexPage = () => {
	return (
		<div>
			<LoginForm />
			<Carouse />
			<HotRecommend />
			<NewAlbum />
			<Ranking />
		</div>
	);
};
