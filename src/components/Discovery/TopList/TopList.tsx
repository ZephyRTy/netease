import React from 'react';
import './style/TopList.scss'
export const TopList = (props: { info: any; index: any }) => {
	const tracks = props.info;
	return (
		<div className="TopRankingWrapper">
			<div className="TopRankingWrapper-ranking-header">
				<div className="TopRankingWrapper-ranking-header-tit">
					<div>
						<h3>{props.info.name}</h3>
					</div>
					<div className="TopRankingWrapper-ranking-header-tit-btn">
						<a>播放</a>
						<a>收藏</a>
					</div>
				</div>
			</div>
			<div className="TopRankingWrapper-ranking-list">
				{tracks &&
					tracks.length > 0 &&
					tracks.slice(0, 10).map((item: any, index: any) => {
						return (
							<div
								className="TopRankingWrapper-ranking-list-list-item"
								key={item.id}
							>
								<div className="number">{index + 1}</div>
								<a>{item.name}</a>
							</div>
						);
					})}
			</div>
			<div className="TopRankingWrapper-ranking-footer">
                <a>查看全部&gt;</a>
            </div>
		</div>
	);
};
