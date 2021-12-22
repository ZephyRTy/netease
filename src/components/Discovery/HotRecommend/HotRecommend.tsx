import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { realIP, serverPath } from '../../../utils/global';
import { TitleTheme } from '../TitleTheme/TitleTheme';
import { SongCover } from '../SongCover/SongCover';
export const HotRecommend = () => {
	
	const [hotRecommend, sethotRecommend] = useState([]);

	useEffect(() => {
		const url = `${serverPath}/personalized?realIP=${realIP}`;
		const fetchData = async () => {
			const result = await axios(url);
			sethotRecommend(result.data['result'])
		};
		fetchData();
	}, []);
	console.log(hotRecommend)
	// useEffect(() => {
	// 	const url = `${serverPath}/personalized?realIP=${realIP}`;
	// 	fetch(url, {
	// 		method: 'GET'
	// 	})
	// 		.then((res) => {
	// 			return res.json();
	// 		})
	// 		.then((data) => {
	// 			console.log(data)
	// 			hotrecommend = data['result'];
	// 		})
	// 		.catch((err) => console.log(err));
	// });

	return (
		<div className="HotRecommendWrapper">
			<TitleTheme
				keywords={['华语', '流行', '摇滚', '民谣', '电子']}
				keywordsClick={undefined}
				right={undefined}
				showIcon={undefined}
				title="热门推荐"
			/>
			<div className="HotRecommendWrapper-recommend-list">
				{hotRecommend && hotRecommend.map((item: any) => {
					return <SongCover info={item} key={item.id} songList={''}
width={140}
					       />;
				}
				)}
			</div>
		</div>
	);
};
