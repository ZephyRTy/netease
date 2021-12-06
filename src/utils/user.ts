import axios from 'axios';
import { action, makeObservable, observable } from 'mobx';
import { realIP, serverPath } from './global';
import { PlayList } from './playList';
/**
 * User类，存放用户信息的数据结构
 * 全局单例模式
 */
class User {
	private _uid: string = ''; //用户的id
	private _cookie: string = ''; //登录后的cookie

	_LogStatus = false; //登录状态
	_infoLoaded = false;

	profile: any = null; //用户个人信息
	personalInfo: any = null;
	nickName: string = ''; //用户昵称

	//!观察状态为observable.ref，所以为immutable。对playLists的修改均应通过User类方法 add 和 delete 完成。
	playLists: PlayList[] = []; //用户的所有歌单

	constructor() {
		makeObservable(this, {
			playLists: observable.ref,
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
				this._cookie = res.data.cookie;
				this._uid = res.data.account.id;
				this._LogStatus = true;
				this.profile = res.data.profile;
				this.nickName = this.profile.nickName;
			})
			.catch((err) => console.log(err));
		axios
			.get(
				`${serverPath}/user/subcount?realIP=${realIP}&cookie=${this._cookie}`
			)
			.then(console.log);
		await this.getAllPlaylists();
		//console.log(this.playLists);
	}

	/**
	 * 退出登录
	 * @description 退出后清空信息，User对象仍保留
	 */
	LogOut() {
		axios.get(`${serverPath}/logout?realIP=${realIP}`);
		this._cookie = '';
		this._uid = '';
		this.playLists = [];
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
				this.playLists = res.data.playlist.map(
					(v: any) => new PlayList(v, this._cookie)
				);
				this._infoLoaded = true;
			});
	}

	add(playListId: string) {
		this.playLists = [
			...this.playLists,
			new PlayList(playListId, this._cookie)
		];
	}

	/**
	 * 从歌单中删除歌曲
	 * @param trackId 要删除的歌曲id
	 */
	delete(playListId: string) {
		const index = this.playLists.findIndex(
			(elem) => elem.id === playListId
		);
		this.playLists = [
			...this.playLists.slice(0, index),
			...this.playLists.slice(index + 1)
		];
	}
	/**
	 * 用户uid的访问器
	 */
	get uid() {
		return this._uid;
	}

	get cookie() {
		return this._cookie;
	}

	get status() {
		return this._LogStatus;
	}
}
export const user = new User(); // User类的全局单例
