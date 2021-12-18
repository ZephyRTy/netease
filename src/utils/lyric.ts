import axios from 'axios';
import React from 'react';
import { realIP, serverPath } from './global';
export class LyricItem {
	private _timeStamp = '';
	private _content = '';
	constructor(content: string) {
		let v = content.split(']');
		this._content = v[1];
		this._timeStamp = v[0].slice(1);
	}

	get content() {
		return this._content;
	}
}

export class Lyric {
	private _lyrics = [] as LyricItem[];
	private _absolute = false;
	getLyric(setState: React.Dispatch<React.SetStateAction<any>>, id: string) {
		axios
			.get(`${serverPath}/lyric?id=${id}&realIP=${realIP}`)
			.then((res) => {
				const lyric: string[] = res.data.lrc.lyric
					.split('\n')
					.slice(0, -1);
				if (lyric.includes('[99:00.00]纯音乐，请欣赏')) {
					this._absolute = true;
					this._lyrics.push(
						new LyricItem('[99:00.00]纯音乐，请欣赏')
					);
				} else {
					this._lyrics = lyric.map((v) => {
						return new LyricItem(v);
					});
				}
				setState(this);
			});
	}

	get traverse() {
		return [...this._lyrics];
	}
}
