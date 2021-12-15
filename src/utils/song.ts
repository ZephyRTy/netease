import axios from 'axios';
import { cookie, realIP, serverPath } from './global';

interface IAlbum {
	id: string;
	name: string;
	pic: string;
	picUrl: string;
}
interface IArtist {
	id: string;
	name: string;
}
export class Song {
	private _name: string = '';
	private _id: string = '';
	album: IAlbum = { id: '', name: '', pic: '', picUrl: '' };
	private _artists: IArtist[] = [];
	private _duration = 0; //歌曲时长，保存为毫秒，表示格式为""
	private _url = '';
	constructor(
		name: string,
		id: string,
		albumInfo: IAlbum,
		artists: IArtist[],
		duration: number
	) {
		this._id = id;
		this._name = name;
		this.album = albumInfo;
		this._artists = artists;
		this._duration = duration;
	}

	/**
	 *
	 * @param millisecond 歌曲时长的毫秒数
	 * @param showMillisecond 返回字符串是否显示毫秒
	 * @returns 毫秒数的 分：秒（.毫秒）形式字符串
	 */
	static parse(millisecond: number, showMillisecond = true) {
		let mm = millisecond % 1000;
		let allSeconds = Math.floor(millisecond / 1000);
		let minutes = Math.floor(allSeconds / 60);
		let seconds = allSeconds % 60;
		return (
			`${minutes.toString().padStart(2, '0')}:${seconds
				.toString()
				.padStart(2, '0')}` + (showMillisecond ? `.${mm}` : '')
		);
	}

	/**
	 * 获取歌曲id
	 */
	getUrl() {
		axios
			.get(
				`${serverPath}/song/url?id=${
					this.id
				}&realIP=${realIP}&cookie=${cookie.get()}`
			)
			.then(console.log)
			.catch(console.log);
	}
	get id() {
		return this._id;
	}
	get name() {
		return this._name;
	}
	get artists() {
		return this._artists.map((v) => v.name).join('/');
	}
	get duration() {
		return Song.parse(this._duration, false);
	}
}
