import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useDataFetch } from '../../../utils/hooks/useAsync';
import { PlayList } from '../../../utils/model/playList';
import { user } from '../../../utils/model/user';
import { CommentList } from '../CommentList';
import { PlaylistInfo } from '../Playlists/PlaylistInfo';
import '../style/songList.scss';
import { SongList } from './SongList';
export const SongListWrapper = observer(
	(props: { user: typeof user; defaultList?: boolean }) => {
		const { id } = useParams();
		const [playlist, setPlaylist] = useState(null as unknown as PlayList);
		useDataFetch(
			() => {
				return PlayList.derive(id, props.user, props.defaultList);
			},
			setPlaylist,
			[id, user.infoLoaded],
			null as any
		);
		return (
			<div className="song-detail-wrapper">
				<PlaylistInfo active={playlist!} />
				<SongList active={playlist!} />
				<CommentList active={playlist!} />
			</div>
		);
	}
);
