import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Carousel } from 'antd';
import { realIP, serverPath } from '../../../utils/global';
import './style/Carouse.scss';
import axios from 'axios';
import { isConstructorDeclaration } from 'typescript';

export const Carouse = () => {
	const [curentIndex, setCurentIndex] = useState(0);
	const bannerRef = useRef();
	const bannerChange = useCallback((from, to) => {
		setCurentIndex(to);
	}, []);

	const [topBanner, settopBanner] = useState([]);
	useEffect(() => {
		const url = `${serverPath}/banner?realIP=${realIP}`;
		const fetchData = async () => {
			const result = await axios(url);
			settopBanner(result.data['banners']);
		};
		fetchData();
	}, []);

	return (
		<div className="BannerWrapper">
			<div className="BannerWrapper-banner">
				<div className="BannerLeft">
					<Carousel
						autoplay
						beforeChange={bannerChange}
						dots={false}
						effect="fade"
						ref={bannerRef as any}
					>
						{topBanner &&
							topBanner.map((item: any) => {
								return (
									<div key={item.imageUrl}>
										<img
											alt={item.typeTitle}
											className="BannerLeft-img"
											src={item.imageUrl}
										/>
									</div>
								);
							})}
					</Carousel>
				</div>
				<div className="BannerControl">
					<button
						className="BannerControl-btn"
						onClick={() => (bannerRef as any).current.prev()}
					></button>
					<button
						className="BannerControl-btn"
						onClick={() => (bannerRef as any).current.next()}
					></button>
				</div>
			</div>
		</div>
	);
};
