import { observer } from 'mobx-react-lite';
import React from 'react';
import { User } from '../../../utils/model/user';
import { Carouse } from '../Carouse/Carouse';
import { HotRecommend } from '../HotRecommend/HotRecommend';
import { LoginForm } from '../Login-form/LoginForm';
import { NewAlbum } from '../NewAlbum/NewAlbum';
import { Ranking } from '../Ranking/Ranking';
export const IndexPage = observer((props: { user: User }) => {
	return (
		<div>
			{props.user.LogStatus ? null : <LoginForm />}
			<Carouse />
			<HotRecommend />
			<NewAlbum />
			<Ranking />
		</div>
	);
});
