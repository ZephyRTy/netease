import axios from 'axios';
import { cookie, realIP, serverPath } from '../global';

/**
 * 单条评论
 */
export class Comment {
	private _name = '';
	private _content = '';
	private _timeStamp = '';
	private _avatar = '';

	/**
	 *
	 * @param name 评论的用户名
	 * @param content 评论的内容
	 * @param timeStamp 评论的时间
	 * @param avatar 评论用户的头像
	 */
	constructor(
		name: string,
		content: string,
		timeStamp: string,
		avatar: string
	) {
		this._content = content;
		this._name = name;
		this._timeStamp = timeStamp;
		this._avatar = avatar;
	}

	get name() {
		return this._name;
	}

	get content() {
		return this._content;
	}

	get timeStr() {
		return this._timeStamp;
	}

	get avatar() {
		return this._avatar;
	}
}

/**
 * 所有评论
 */
export class CommentUtil {
	/**
	 * 获取评论
	 * @param setState 组件中的setState函数
	 * @param id 歌单或歌曲的id
	 * @param mode 选择获取歌单还是歌曲的评论
	 * @param cookieValue cookie
	 */
	async getComments(
		id: string,
		mode: 'music' | 'playlist' | 'album',
		cookieValue = cookie.get()
	) {
		return axios
			.get(
				`${serverPath}/comment/${mode}?id=${id}&realIP=${realIP}&cookie=${cookieValue}`
			)
			.then((res) => {
				return res.data.comments.map(
					(v: any) =>
						new Comment(
							v.user.nickname,
							v.content,
							v.timeStr,
							v.user.avatarUrl
						)
				);
			})
			.catch(console.error);
	}
	// 遍历评论列表
}
