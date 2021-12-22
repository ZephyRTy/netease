import axios from 'axios';
import { cookie, realIP, serverPath } from './global';
import { Artist } from './model/artist';
import { PlayList } from './model/playList';
import { IAlbum, IArtist, Song } from './model/song';

export class SimUtil {
	private constructor() {}
	static async getSim(id: string, mode: 'song' | 'playlist' | 'artist') {
		if (!id) {
			return;
		}
		const res = await axios.get(
			`${serverPath}/simi/${mode}?id=${id}&realIP=${realIP}&cookie=${cookie.get()}`
		);
		console.log(res);
		return SimUtil.utils[mode as string](res.data[`${mode}s`]);
	}
	private static utils: { [song: string]: Function; playlist: Function } = {
		song: (
			o: {
				name: string;
				id: string;
				album: IAlbum;
				artists: IArtist[];
				duration: number;
			}[]
		) => {
			return o.map(
				(obj) =>
					new Song(
						obj.name,
						obj.id,
						obj.album,
						obj.artists,
						obj.duration
					)
			);
		},
		playlist(
			info: {
				id: string;
				name: string;
				coverImgUrl: string;
				trackCount: number;
				creator: { nickname: string };
			}[]
		) {
			return info.map((v) => new PlayList(v));
		},
		artist(
			param: {
				id: string;
				name?: string;
				url?: string;
				desc?: string;
			}[]
		) {
			return param.map((v) => new Artist(v)).slice(0, 6);
		}
	};
}
