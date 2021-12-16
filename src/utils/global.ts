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
