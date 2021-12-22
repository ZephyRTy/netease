import { Song } from './model/song';

export class SongSet {
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
