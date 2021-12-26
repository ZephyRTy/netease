import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { realIP, serverPath } from '../../../utils/global';
import { Carousel } from 'antd';
import { AlbumCover } from '../AlbumCover/AlbumCover';
import { TitleTheme } from '../TitleTheme/TitleTheme';
import './style/NewAlbum.scss';
export const NewAlbum = () => {
	const [newAlbum, setNewAlbum] = useState([]);
	useEffect(() => {
		const url = `${serverPath}/top/album?realIP=${realIP}`;
		const fetchData = async () => {
			const result = await axios(url);
			setNewAlbum(result.data['weekData']);
		};
		fetchData();
	}, []);
    
	const albumRef = useRef();
	return (
		<div className="NewAlbumWrapper">
			<TitleTheme
				
                keywords={['']} keywordsClick={undefined} right={undefined}
showIcon={undefined} title="新碟上架"
			/>
			<div className="NewAlbumWrapper-content">
				<div className="NewAlbumWrapper-content-inner">
					<Carousel dots={false} ref={albumRef as any}>
						{[0, 1].map((item) => {
							return (
								<div className="page" key={item}>
									{newAlbum &&
										newAlbum
											.slice(item * 5, (item + 1) * 5)
											.map((cItem: any) => {
												return (
													<AlbumCover
														info={cItem}
														key={cItem.id}
													/>
												);
											})}
								</div>
							);
						})}
					</Carousel>
				</div>
				<div
					className="NewAlbumWrapper-content-arrow-left"
					onClick={(e) => (albumRef as any).current.prev()}
				></div>
				<div
					className="NewAlbumWrapper-content-arrow-right"
					onClick={(e) => (albumRef as any).current.next()}
				></div>
			</div>
		</div>
	);
};
