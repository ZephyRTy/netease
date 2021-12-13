import axios from 'axios';
import { observable } from 'mobx';
import { active, realIP, serverPath } from './global';
import { Song } from './song';
export class PlayList {
	private _id: string = ''; //歌单的id
	private _name: string = '';
	private _length = 0;
	coverImgUrl: string = '';
	//!观察状态为observable.ref，所以应为immutable。对trackIds的修改均应通过PlayList类方法 add 和 delete 完成。
	trackIds = observable.array([] as string[]); //歌单中所有歌曲的id
	songList = observable.array([] as Song[]);
	/**
	 * @constructor
	 * @param id 歌单的id
	 * @param cookie 用户的cookie，在PlayList中仅用与请求歌单信息，不做保存
	 */
	constructor(listInfo: any, cookie: string, first: boolean = false) {
		this._id = listInfo.id.toString();
		this._name = listInfo.name;
		this.coverImgUrl = listInfo.coverImgUrl;
		this._length = listInfo.trackCount;
		try {
			this.getDetail(cookie).then((res) => {
				if (first) {
					this.getTracks(cookie);
				}
			});
		} catch (err) {
			console.log(err);
		}
	}

	/**
	 * 获取歌单中所有歌曲
	 * @param cookie 用户的cookie，只用于请求
	 */
	private async getDetail(cookie: string) {
		await axios
			.get(
				`${serverPath}/playlist/detail?id=${this._id}&realIP=${realIP}&cookie=${cookie}`
			)
			.then((res) => {
				this.trackIds.replace(
					res.data.playlist.trackIds.map((v: any) => v.id)
				);
			})
			.catch(console.log);
	}
	getTracks(cookie: string) {
		active.status = false;
		axios
			.get(
				`${serverPath}/song/detail?ids=${this.trackIds.join(
					','
				)}&realIP=${realIP}&cookie=${cookie}`
			)
			.then((res) => {
				active.status = true;
				active.activeList.replace(
					res.data.songs.map((v: any) => new Song(v.name, v.al.id))
				);
			})
			.catch(console.log);
	}
	/**
	 * 往歌单中添加歌曲
	 * @param trackId 要添加的歌曲id
	 */
	add(trackId: string) {
		this.trackIds.push(trackId);
	}

	/**
	 * 从歌单中删除歌曲
	 * @param trackId 要删除的歌曲id
	 */
	delete(trackId: string) {
		const index = this.trackIds.indexOf(trackId);
		this.trackIds.splice(index, 1);
	}

	/**
	 * 歌单id的访问器
	 */
	get id() {
		return this._id;
	}

	get name() {
		return this._name;
	}

	get length() {
		return this._length;
	}
}
