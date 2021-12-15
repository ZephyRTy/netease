import axios from 'axios';
import { action, makeObservable, observable } from 'mobx';
import { cookie, realIP, serverPath } from './global';
import { PlayList } from './playList';

interface ISubInfo {
	createdPlaylistCount: number;
	subPlaylistCount: number;
}

/**
 * User类，存放用户信息的数据结构
 * 全局单例模式
 */
class User {
	private _uid: string = ''; //用户的id
	private _subInfo: ISubInfo = {
		subPlaylistCount: 0,
		createdPlaylistCount: 0
	};
	_LogStatus = false; //登录状态
	_infoLoaded = false;

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
			_LogStatus: observable,
			_infoLoaded: observable,
			LogIn: action,
			LogOut: action
		});
	}

	/**
	 * 手机号登录
	 * @param phone 用户的手机号
	 * @param password 用户的密码
	 */
	async LogIn(phone: string, password: string, mode: string = 'cellphone') {
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
					throw '密码错误';
				}
				cookie.set(res.data.cookie);
				this._uid = res.data.account.id;
				this._LogStatus = true;
				this.profile = res.data.profile;
				this.nickName = this.profile.nickName;
			})
			.catch((err) => console.log(err));
		axios
			.get(
				`${serverPath}/user/subcount?realIP=${realIP}&cookie=${cookie.get()}`
			)
			.then((res) => (this._subInfo = res.data));
		await this.getAllPlaylists();
	}

	/**
	 * 退出登录
	 * @description 退出后清空信息，User对象仍保留
	 */
	LogOut() {
		axios.get(`${serverPath}/logout?realIP=${realIP}`);
		cookie.set('');
		this._uid = '';
		this.createdPlaylists.length = 0;
		this.subPlaylists.length = 0;
		this._LogStatus = false;
	}

	/**
	 * 获取用户的所有歌单信息
	 */
	private async getAllPlaylists() {
		await axios
			.get(
				`${serverPath}/user/playlist?uid=${this._uid}&realIP=${realIP}`
			)
			.then((res) => {
				this.createdPlaylists.push(
					...res.data.playlist
						.slice(0, this.createdPlaylistCount)
						.map((v: any, i: number) => {
							return i === 0
								? new PlayList(v, cookie.get(), true)
								: new PlayList(v, cookie.get());
						})
				);
				this.subPlaylists.push(
					...res.data.playlist
						.slice(this.createdPlaylistCount)
						.map((v: any) => new PlayList(v, cookie.get()))
				);
				this._infoLoaded = true;
			});
	}

	/**
	 * 添加歌单
	 * @param playListId 要添加的歌单id
	 * @param mode 添加到哪个歌单列表中
	 */
	add(playListId: string, mode: 'created' | 'sub' = 'created') {
		const sym = mode === 'created' ? 'createdPlaylists' : 'subPlaylists';
		this[sym].push(new PlayList(playListId, cookie.get()));
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
	 * 用户uid的访问器
	 */
	get uid() {
		return this._uid;
	}

	get status() {
		return this._LogStatus;
	}

	get createdPlaylistCount() {
		return this._subInfo.createdPlaylistCount;
	}

	get subPlaylistCount() {
		return this._subInfo.subPlaylistCount;
	}
}
export const user = new User(); // User类的全局单例
