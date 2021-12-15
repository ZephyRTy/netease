import React, { useEffect } from 'react';
import { cookie, realIP, serverPath } from '../../../utils/global';
export const HotRecommend = () => {
	let hotrecommend: any;
	useEffect(() => {
		const url = `${serverPath}/personalized?realIP=${realIP}`;
		fetch(url, {
			method: 'GET'
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				hotrecommend = data['result'];
			})
			.catch((err) => console.log(err));
	});

	return (
		<div>
			<h1>热门推荐</h1>
			<div>
				{hotrecommend &&
					hotrecommend.map((item: any, index: number) => {
						return (
							<div key={index}>
								<h1>{item.name}</h1>
								<img alt={item.name} src={item.picUrl} />
							</div>
						);
					})}
			</div>
		</div>
	);
};
