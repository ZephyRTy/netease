import axios from 'axios';
import { makeObservable, observable, runInAction } from 'mobx';
import React from 'react';
import { realIP, serverPath } from '../utils/global';
import { CommentUtil, HaveComment } from './comment';
import { Song } from './song';
export class PlayList implements HaveComment {
	private _id: string = ''; // 歌单的id
	private _name: string = ''; // 歌单名称
	private _count = 0; // 歌单中歌曲的数量
	private _description = '';
	private _creator = '';
	comments = new CommentUtil();
	private _coverImgUrl: string = ''; // 歌单封面

	//! 歌曲数组为可观察对象，因此不能改变列表的引用
	readonly trackIds = [] as string[]; //歌单中所有歌曲的id

	/**
	 * @constructor
	 * @param id 歌单的id
	 * @param cookie 用户的cookie，在PlayList中仅用与请求歌单信息，不做保存
	 */
	constructor(
		listInfo: {
			id: string;
			name: string;
			coverImgUrl: string;
			trackCount: number;
			creator: { nickname: string };
		},
		cookie: string
	) {
		makeObservable(this, { trackIds: observable });
		this._id = listInfo.id.toString();
		this._name = listInfo.name;
		this._coverImgUrl = listInfo.coverImgUrl;
		this._count = listInfo.trackCount;
		this._creator = listInfo.creator.nickname;
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
	private async getDetail(cookie: string) {
		this.trackIds.length = 0;
		await axios
			.get(
				`${serverPath}/playlist/detail?id=${this._id}&realIP=${realIP}&cookie=${cookie}`
			)
			.then((res) => {
				runInAction(() => {
					this._description = res.data.playlist.description;
					this.trackIds.push(
						...res.data.playlist.trackIds.map((v: any) => v.id)
					);
				});
			})
			.catch(console.log);
	}

	/**
	 * 获取歌单评论
	 * @param cookie
	 * @param setState  React组件中的setState函数
	 */
	getComments(setState: any) {
		this.comments.getComments(setState, this.id, 'playlist');
	}

	/**
	 * 获取歌单中歌曲的详细信息
	 * @param cookie
	 * @param setState React组件中的setState函数
	 */
	getSongs(
		cookie: string,
		setState: React.Dispatch<React.SetStateAction<any>>
	) {
		if (this.trackIds.length === 0) return;
		axios
			.get(
				`${serverPath}/song/detail?ids=${this.trackIds.join(
					','
				)}&realIP=${realIP}&cookie=${cookie}`
			)
			.then((res) => {
				setState(
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
			})
			.catch(console.log);
	}

	/**
	 * 获取歌单封面
	 * @param setState React组件中的setState函数
	 */
	getCover(setState: any) {
		const img = new Image();
		img.src = this._coverImgUrl;
		img.onload = () => {
			img.onload = null;
			setState(img.src);
		};
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

	get id() {
		return this._id;
	}

	get name() {
		return this._name;
	}

	get length() {
		return this._count;
	}

	get description() {
		return this._description;
	}

	get cover() {
		return this._coverImgUrl;
	}

	get creator() {
		return this._creator;
	}
}
