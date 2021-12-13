import { observer } from 'mobx-react';
import React from 'react';
import { active } from '../../utils/global';
import { Song } from '../../utils/song';
import { Loading } from './Loading';
import './style/songList.scss';

const SongItem = (props: { id: string; name: string }) => {
	return <li className="song-detail-list-item">{props.name}</li>;
};

const SongList = observer(
	(props: { active: { activeList: Song[]; status: boolean } }) => {
		return (
			<ul className="song-detail-list">
				{active.status ? (
					props.active.activeList.map((v, i) => (
						<SongItem id={v.id} key={i} name={v.name} />
					))
				) : (
					<Loading />
				)}
			</ul>
		);
	}
);

export const SongListContain = () => {
	return (
		<div className="song-detail-contain">
			<SongList active={active} />
		</div>
	);
};
