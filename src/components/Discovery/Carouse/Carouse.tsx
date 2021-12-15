import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Carousel } from 'antd';
import { action, makeObservable, observable } from 'mobx';
import { cookie, realIP, serverPath } from '../../../utils/global';
import './style/Carouse.scss';
import Item from 'antd/lib/list/Item';
export const Carouse = () => {
	const [curentIndex, setCurentIndex] = useState(0);
	const bannerRef = useRef();
	const bannerChange = useCallback((from, to) => {
		setCurentIndex(to);
	}, []);

	let topBanner: any;
	useEffect(()=>{
		const url = `${serverPath}/banner?realIP=${realIP}`;
		fetch(url, {
			method: 'GET'
		})
		.then((res) => {
			return res.json();
		})
		.then((data)=>{
			console.log(data);
			topBanner = data['banners']
		})
		.catch((err) => console.log(err));
	})
	
	return (
		<div>
			<Carousel
				autoplay
				beforeChange={bannerChange}
				effect="fade"
				
			>
				{topBanner &&
					topBanner.map((item: any, index: number) => {
						return (
							<div key={index}>
								<img alt={item.typeTitle} src={item.imageUrl} />
							</div>
						);
					})}
			</Carousel>
		</div>
	);
};
