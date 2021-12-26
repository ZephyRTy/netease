import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { realIP, serverPath } from '../../../utils/global';
import { SongCover } from '../SongCover/SongCover';
import { TitleTheme } from '../TitleTheme/TitleTheme';
import './style/HotRecommend.scss';
export const HotRecommend = () => {
	const [hotRecommend, sethotRecommend] = useState([]);

	useEffect(() => {
		const url = `${serverPath}/personalized?realIP=${realIP}`;
		const fetchData = async () => {
			const result = await axios(url);
			sethotRecommend(result.data['result']);
		};
		fetchData();
	}, []);

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
				{hotRecommend &&
					hotRecommend.map((item: any) => {
						return (
							<SongCover
								info={item}
								key={item.id}
								songList={undefined}
								width={140}
							/>
						);
					})}
			</div>
		</div>
	);
};
