import { makeAutoObservable, observable } from 'mobx';
import { Song } from './song';

export const realIP = '76.223.126.88';
export const serverPath =
	'https://netease-cloud-music-api-ol9f71wh4-zephyrty.vercel.app';
export const cookie = {
	value: '',
	get() {
		return this.value;
	},
	set(newV: string) {
		this.value = newV;
	}
};
const activeList = observable.array([] as Song[]);
export const active = makeAutoObservable({ activeList, status: false });
