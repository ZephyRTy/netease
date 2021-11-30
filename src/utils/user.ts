import axios from 'axios';
import { realIP, serverPath } from './global';
import { PlayList } from './playList';
/**
 * User类，存放用户信息的数据结构
 * 全局单例模式
 */
class User {
	private _uid: string = ''; //用户的id
	cookie: string = ''; //登录后的cookie
	isLogIn = false; //登录状态
	playLists: PlayList[] = []; //用户的所有歌单

	/**
	 * 登录
	 * @param id 用户的uid
	 * @param cookie 登录后的cookie
	 */
	LogIn(id: any, cookie: any) {
		this.cookie = cookie.toString();
		this._uid = id.toString();
		this.isLogIn = true;
		//this.getAllPlaylists();
	}

	/**
	 * 退出登录
	 * @description 退出后清空信息，User对象仍保留
	 */
	LogOut() {
		axios.get(`${serverPath}/logout?realIP=${realIP}`);
		this.cookie = '';
		this._uid = '';
		this.playLists = [];
		this.isLogIn = false;
	}

	/**
	 * 获取用户的所有歌单信息
	 */
	private getAllPlaylists() {
		axios
			.get(
				`${serverPath}/user/playlist?uid=${this._uid}&realIP=${realIP}`
			)
			.then((res) => {
				this.playLists = res.data.playlist.map(
					(v: any) => new PlayList(v.id, this.cookie)
				);
			});
	}

	/**
	 * 用户uid的访问器
	 */
	get uid() {
		return this._uid;
	}
}

export const user = new User(); // User类的全局单例
