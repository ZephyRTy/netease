import axios from 'axios';
import { cookie, realIP, serverPath } from '../global';
import { HaveSongSet } from '../interface';
import { SongUtil } from '../SongUtil';
import { Song } from './song';

export class Artist implements HaveSongSet {
	songSet: SongUtil = null as any;
	private _id = '';
	async getSongs(id: string, mode: 'artist' | 'album' = 'artist') {
		try {
			const res = await axios.get(
				`${serverPath}/${mode}/songs?id=${this._id}&realIP=${realIP}&cookie=${cookie}`
			);
			this.songSet = new SongUtil(
				res.data.songs.map(
					(v: any) =>
						new Song(
							v.name,
							v.id,
							v.al,
							v.ar.map((v: any) => {
								return { id: v.id, name: v.name };
							}),
							v.dt
						)
				)
			);
			return this.songSet;
		} catch (message) {
			return console.error(message);
		}
	}
}
