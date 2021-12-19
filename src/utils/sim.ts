import axios from 'axios';
import { cookie, realIP, serverPath } from './global';
import { PlayList } from './playList';
import { IAlbum, IArtist, Song } from './song';
import { Track } from './track';

export class SimUtil {
	private constructor() {}
	static async getSim(obj: Track, mode: 'song' | 'playlist') {
		const res = await axios.get(
			`${serverPath}/simi/${mode}?id=${
				obj.id
			}&realIP=${realIP}&cookie=${cookie.get()}`
		);
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
		}
	};

	static playlist(id: string) {
		axios
			.get(
				`${serverPath}/simi/playlist?id=${id}&realIP=${realIP}&cookie=${cookie.get()}`
			)
			.then((res) => console.log(res));
	}
}
