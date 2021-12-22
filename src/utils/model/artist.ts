import axios from 'axios';
import { cookie, realIP, serverPath } from '../global';
import { HaveSongSet } from '../interface';
import { SongSet } from '../SongSet';
import { Song } from './song';

export class Artist implements HaveSongSet {
	private _id: string;
	private _name: string;
	private _picUrl: string;
	private _description: string;
	songSet: SongSet = new SongSet();
	constructor(param: {
		id: string;
		name?: string;
		picUrl?: string;
		desc?: string;
	}) {
		this._id = param.id;
		this._name = param.name ?? '';
		this._picUrl = param.picUrl ?? '';
		this._description = param.desc ?? '';
	}
	static async derive(id: string) {
		try {
			const res = await axios.get(
				`${serverPath}/artists?id=${id}&realIP=${realIP}&cookie=${cookie}`
			);
			let a = res.data.artist;
			const art = new Artist(a);
			art.songSet = new SongSet(
				res.data.hotSongs.map(
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
			return art;
		} catch (message) {
			return console.error(message);
		}
	}
	getSongs() {
		return Promise.resolve(this.songSet);
	}
	get cover() {
		return this._picUrl;
	}

	get name() {
		return this._name;
	}

	get id() {
		return this._id;
	}
}
