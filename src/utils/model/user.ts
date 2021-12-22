import axios from 'axios';
import { action, makeObservable, observable, runInAction } from 'mobx';
import { cookie, realIP, serverPath } from '../global';
import { PlayList } from './playList';

interface ISubInfo {
	createdPlaylistCount: number;
	subPlaylistCount: number;
}

/**
 * User类，存放用户信息的数据结构
 * 全局单例模式
 */
export class User {
	private _uid: string = ''; //用户的id
	private _subInfo: ISubInfo = {
		subPlaylistCount: 0,
		createdPlaylistCount: 0
	};
	LogStatus = false; //登录状态
	infoLoaded = false;

	profile: any = null; //用户个人信息
	personalInfo: any = null;
	nickName: string = ''; //用户昵称

	//! 歌单数组为可观察对象，因此不能改变列表的引用
	readonly subPlaylists = [] as PlayList[];
	readonly createdPlaylists = [] as PlayList[];

	constructor() {
		makeObservable(this, {
			subPlaylists: observable,
			createdPlaylists: observable,
			LogStatus: observable,
			infoLoaded: observable,
			logIn: action,
			logOut: action,
			getAllPlaylists: action
		});
	}

	/**
	 * 手机号登录
	 * @param phone 用户的手机号
	 * @param password 用户的密码
	 */
	async logIn(phone: string, password: string, mode: string = 'cellphone') {
		console.log('log in');
		if (this.LogStatus) {
			throw new Error('重复登录');
		}
		this.createdPlaylists.length = 0;
		this.subPlaylists.length = 0;
		await axios
			.get(`${serverPath}/login/${mode}`, {
				params: {
					phone,
					password,
					realIP
				}
			})
			.then((res) => {
				if (res.data.code === 502) {
					throw new Error('密码错误');
				}
				cookie.set(res.data.cookie);
				this._uid = res.data.account.id;
				runInAction(() => {
					this.LogStatus = true;
				});
				this.profile = res.data.profile;
				this.nickName = this.profile.nickName;
			})
			.catch((err) => console.log(err));
	}

	/**
	 * 退出登录
	 * @description 退出后清空信息，User对象仍保留
	 */
	logOut() {
		axios.get(`${serverPath}/logout?realIP=${realIP}`);
		cookie.set('');
		this._uid = '';
		this.createdPlaylists.length = 0;
		this.subPlaylists.length = 0;
		this.LogStatus = false;
	}

	/**
	 * 获取用户的所有歌单信息
	 * derive Playlist
	 */
	async getAllPlaylists() {
		this.infoLoaded = false;
		await axios
			.get(
				`${serverPath}/user/subcount?realIP=${realIP}&cookie=${cookie.get()}`
			)
			.then((res) => (this._subInfo = res.data));
		return axios
			.get(
				`${serverPath}/user/playlist?uid=${this._uid}&realIP=${realIP}`
			)
			.then((res) => {
				runInAction(() => {
					this.createdPlaylists.push(
						...res.data.playlist
							.slice(0, this.createdPlaylistCount)
							.map((v: any) => {
								return new PlayList(v);
							})
					);
					this.subPlaylists.push(
						...res.data.playlist
							.slice(this.createdPlaylistCount)
							.map((v: any) => {
								return new PlayList(v);
							})
					);
					this.infoLoaded = true;
				});
				return [
					this.createdPlaylists.slice(0),
					this.subPlaylists.slice(0)
				];
			});
	}

	/**
	 * 从歌单列表中删除歌单
	 * @param playListId 要删除的歌单id
	 * @param mode 从哪个歌单列表中删除
	 */
	delete(playListId: string, mode: 'created' | 'sub' = 'created') {
		const sym = mode === 'created' ? 'createdPlaylists' : 'subPlaylists';
		const index = this[sym].findIndex((elem) => elem.id === playListId);
		this[sym].splice(index, 1);
	}

	/**
	 *
	 * @param playlistId 要获取的歌单id
	 * @returns id对应的歌单
	 */
	find(playlistId: string | undefined, defaultList?: boolean) {
		let c = cookie.get();
		if (this.createdPlaylists.length === 0) {
			return;
		}
		if (!playlistId || playlistId.length === 0 || defaultList) {
			return this.createdPlaylists[0].getDetail(c);
		}

		return (
			this.createdPlaylists.find((e) => e.id === playlistId) ||
			this.subPlaylists.find((e) => e.id === playlistId) ||
			new PlayList({ id: playlistId })
		).getDetail(c);
	}
	/**
	 * 用户uid的访问器
	 */
	get uid() {
		return this._uid;
	}

	get status() {
		return this.LogStatus;
	}

	get createdPlaylistCount() {
		return this._subInfo.createdPlaylistCount;
	}

	get subPlaylistCount() {
		return this._subInfo.subPlaylistCount;
	}
}
export const user = new User(); // User类的全局单例
