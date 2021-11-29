import axios from 'axios';
import { realIP, serverPath } from './global';

export class PlayList {
	id: string = '';
	trackIds: string[] = [];
	constructor(id: any, cookie: string) {
		this.id = id.toString();
		try {
			this.getAllTracks(cookie);
		} catch (err) {
			console.log(err);
		}
	}

	getAllTracks(cookie: string) {
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
