import { makeAutoObservable } from 'mobx';
import { PlayList } from './playList';
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
//TODO 播放歌曲
// 当前显示的歌曲列表
export const active = makeAutoObservable({
	activePlaylist: null as unknown as PlayList, // 当前显示的歌单
	activeTrack: null as unknown as Song,
	url: '',
	/**
	 * 将要显示的歌单挂载到全局变量中
	 * @param playlist 要显示的歌单
	 */
	mount(playlist: PlayList) {
		this.activePlaylist = playlist;
	},
	play(track: Song) {
		this.activeTrack = track;
	}
});
