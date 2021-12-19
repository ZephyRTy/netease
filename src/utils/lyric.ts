import axios from 'axios';
import { action, makeObservable, observable } from 'mobx';
import { realIP, serverPath } from './global';
import { Timer } from './timer';
export class LyricItem {
	private _timeStamp = 0;
	private _content = '';
	focused = false;
	pos = 0;
	constructor(content: string) {
		makeObservable(this, {
			focused: observable,
			focus: action,
			unfocus: action
		});
		let v = content.split(']');
		this._content = v[1];
		const t = v[0].slice(1).split(':');
		this._timeStamp = parseInt(t[0]) * 60 + Math.round(parseFloat(t[1]));
		//console.log(this._timeStamp);
	}

	get content() {
		return this._content;
	}

	get time() {
		return this._timeStamp;
	}

	focus() {
		this.focused = true;
	}
	unfocus() {
		this.focused = false;
	}
}

export class Lyric {
	private lyrics = [] as LyricItem[];
	async getLyric(id: string) {
		const res = await axios.get(
			`${serverPath}/lyric?id=${id}&realIP=${realIP}`
		);
		const lyric: string[] = res.data.lrc.lyric.split('\n').slice(0, -1);
		if (lyric.includes('[99:00.00]纯音乐，请欣赏')) {
			this.lyrics.push(new LyricItem('[99:00.00]纯音乐，请欣赏'));
		} else {
			this.lyrics = lyric.map((v) => {
				return new LyricItem(v);
			});
		}
		return this;
	}
	item(index: number) {
		return this.lyrics[index];
	}

	mount(div: HTMLDivElement) {
		return new Timer(this.lyrics, div);
	}
	get traverse() {
		return [...this.lyrics];
	}
}
