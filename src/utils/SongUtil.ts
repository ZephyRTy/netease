import { Song } from './obj/song';

export class SongUtil {
	private songs = [] as Song[];

	constructor(songs?: Song[]) {
		if (songs) {
			this.songs = songs;
		}
	}

	get traverse() {
		return [...this.songs];
	}
}
