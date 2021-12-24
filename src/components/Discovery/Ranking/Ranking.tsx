import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { cookie, realIP, serverPath } from '../../../utils/global';
import { TitleTheme } from '../TitleTheme/TitleTheme';
import { TopList } from '../TopList/TopList';
import './style/Ranking.scss';
export const Ranking = () => {
	const [speedRanking, setspeedRanking] = useState([]);
	const [newSongRanking, setnewSongRanking] = useState([]);
	const [originalRanking, setoriginalRanking] = useState([]);
	useEffect(() => {
		const url1 = `${serverPath}/playlist/detail?id=19723756`;
		const url2 = `${serverPath}/playlist/detail?id=3779629`;
		const url3 = `${serverPath}/playlist/detail?id=2884035`;
		const fetchData1 = async () => {
			const result = await axios(url1);
			console.log(result);
			setspeedRanking(result.data['privileges']);
		};
		const fetchData2 = async () => {
			const result = await axios(url2);
			setnewSongRanking(result.data['privileges']);
		};
		const fetchData3 = async () => {
			const result = await axios(url3);
			setoriginalRanking(result.data['privileges']);
		};
		fetchData1();
		fetchData2();
		fetchData3();
	}, []);
	console.log(speedRanking);
	console.log(newSongRanking);
	console.log(originalRanking);

	return (
		<div className="RankingWrapper">
			<TitleTheme
				keywords={[]}
				keywordsClick={undefined}
				right={undefined}
				showIcon={undefined}
				title={'榜单'}
			/>
			<div className="RankingWrapper-ranking-info">
				<TopList index={2} info={originalRanking} />
				<TopList index={0} info={speedRanking} />
				<TopList index={1} info={newSongRanking} />
			</div>
		</div>
	);
};
