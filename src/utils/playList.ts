import axios from 'axios';
import { makeObservable, observable } from 'mobx';
import { realIP, serverPath } from './global';
export class PlayList {
	private _id: string = ''; //歌单的id
	private _name: string = '';
	coverImgUrl: string = '';
	//!观察状态为observable.ref，所以应为immutable。对trackIds的修改均应通过PlayList类方法 add 和 delete 完成。
	trackIds: string[] = []; //歌单中所有歌曲的id
	/**
	 * @constructor
	 * @param id 歌单的id
	 * @param cookie 用户的cookie，在PlayList中仅用与请求歌单信息，不做保存
	 */
	constructor(listInfo: any, cookie: string) {
		makeObservable(this, { trackIds: observable.ref });
		this._id = listInfo.id.toString();
		this._name = listInfo.name;
		this.coverImgUrl = listInfo.coverImgUrl;
		try {
			this.getDetail(cookie);
		} catch (err) {
			console.log(err);
		}
	}

	/**
	 * 获取歌单中所有歌曲
	 * @param cookie 用户的cookie，只用于请求
	 */
	private getDetail(cookie: string) {
		axios
			.get(
				`${serverPath}/playlist/detail?id=${this._id}&realIP=${realIP}&cookie=${cookie}`
			)
			.then((res) => {
				this.trackIds = res.data.playlist.trackIds.map(
					(v: any) => v.id
				);
			})
			.catch(console.log);
	}

	/**
	 * 往歌单中添加歌曲
	 * @param trackId 要添加的歌曲id
	 */
	add(trackId: string) {
		this.trackIds = [...this.trackIds, trackId];
	}

	/**
	 * 从歌单中删除歌曲
	 * @param trackId 要删除的歌曲id
	 */
	delete(trackId: string) {
		const index = this.trackIds.indexOf(trackId);
		this.trackIds = [
			...this.trackIds.slice(0, index),
			...this.trackIds.slice(index + 1)
		];
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
}
