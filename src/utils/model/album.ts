import axios from 'axios';
import { cookie, realIP, serverPath } from '../global';
import { HaveComment, HaveSongSet } from '../interface';
import { SongSet } from '../SongSet';
import { Comment, CommentUtil } from './comment';
import { IArtist, Song } from './song';

export class Album implements HaveSongSet, HaveComment {
	private _id: string;
	private _name: string;
	private _picUrl: string;
	private _description: string;
	private _artist: IArtist;
	songSet: SongSet = new SongSet();
	constructor(param: {
		id: string;
		name?: string;
		picUrl?: string;
		description?: string;
		briefDesc?: string;
		artist: IArtist;
	}) {
		this._id = param.id;
		this._name = param.name ?? '';
		this._picUrl = param.picUrl ?? '';
		this._description = param.description ?? param.briefDesc ?? '';
		this._artist = param.artist;
	}
	comments: CommentUtil = new CommentUtil();
	getComments(): Promise<void | Comment[]> {
		return this.comments.getComments(this.id, 'album');
	}
	static async derive(id: string) {
		try {
			const res = await axios.get(
				`${serverPath}/album?id=${id}&realIP=${realIP}&cookie=${cookie}`
			);
			let a = res.data.album;
			const album = new Album(a);
			album.songSet = new SongSet(
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
			return album;
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

	get artistId() {
		return this._artist.id;
	}
}
