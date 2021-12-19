import axios from 'axios';
import { CommentUtil } from './comment';
import { cookie, realIP, serverPath } from './global';
import { HaveComment } from './interface';
import { Lyric } from './lyric';
import { IAlbum, IArtist, Song } from './song';

export class Track extends Song implements HaveComment {
	lyric: Lyric = new Lyric();
	comments = new CommentUtil();
	private constructor(
		name: string,
		id: string,
		albumInfo: IAlbum,
		artists: IArtist[],
		duration: number
	) {
		super(name, id, albumInfo, artists, duration);
	}

	static async createTrack(id: string) {
		return axios
			.get(
				`${serverPath}/song/detail?ids=${id}&realIP=${realIP}&cookie=${cookie}`
			)
			.then((res) => {
				const v = res.data.songs[0];
				return new Track(
					v.name,
					v.id,
					v.al,
					v.ar.map((v: any) => {
						return { id: v.id, name: v.name };
					}),
					v.dt
				);
			})
			.catch(console.log);
	}
	async getLyric() {
		return this.lyric.getLyric(this.id);
	}

	getComments() {
		return this.comments.getComments(this.id, 'music');
	}

	getSim() {
		axios
			.get(
				`${serverPath}/simi/playlist?id=${
					this.id
				}&realIP=${realIP}&cookie=${cookie.get()}`
			)
			.then((res) => {
				console.log(res);
			})
			.catch(console.log);
	}
}
