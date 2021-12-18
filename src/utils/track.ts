import axios from 'axios';
import React from 'react';
import { CommentUtil, HaveComment } from './comment';
import { cookie, realIP, serverPath } from './global';
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

	static async createTrack(id: string, setState: any) {
		await axios
			.get(
				`${serverPath}/song/detail?ids=${id}&realIP=${realIP}&cookie=${cookie}`
			)
			.then((res) => {
				const v = res.data.songs[0];
				setState(
					new Track(
						v.name,
						v.id,
						v.al,
						v.ar.map((v: any) => {
							return { id: v.id, name: v.name };
						}),
						v.dt
					)
				);
			})
			.catch(console.log);
	}
	getLyric(setState: React.Dispatch<React.SetStateAction<any>>) {
		this.lyric.getLyric(setState, this.id);
	}

	getComments(setState: React.Dispatch<React.SetStateAction<any>>) {
		this.comments.getComments(setState, this.id, 'music');
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
