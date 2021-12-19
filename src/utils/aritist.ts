import { SongSet } from './interface';
import { Song } from './song';

export class Artist implements SongSet {
	trackIds: string[] = [];
	getSongs(cookie: string): Promise<void | Song[]> {
		throw new Error('Method not implemented.');
	}
}
