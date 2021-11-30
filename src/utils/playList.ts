import axios from 'axios';
import { realIP, serverPath } from './global';

export class PlayList {
	id: string = ''; //歌单的id
	trackIds: string[] = []; //歌单中所有歌曲的id
	/**
	 * @constructor
	 * @param id 歌单的id
	 * @param cookie 用户的cookie，在PlayList中仅用与请求歌单信息，不做保存
	 */
	constructor(id: any, cookie: string) {
		this.id = id.toString();
		try {
			this.getAllTracks(cookie);
		} catch (err) {
			console.log(err);
		}
	}

	/**
	 * 获取歌单中所有歌曲
	 * @param cookie 用户的cookie，只用于请求
	 */
	private getAllTracks(cookie: string) {
		axios
			.get(
				`${serverPath}/playlist/detail?id=7063783896&realIP=${realIP}&cookie=${cookie}`
			)
			.then((res) => {
				this.trackIds = res.data.playlist.trackIds.map(
					(v: any) => v.id
				);
			})
			.catch(console.log);
	}
}
