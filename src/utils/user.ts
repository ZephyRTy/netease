import axios from 'axios';
import { realIP, serverPath } from './global';
import { PlayList } from './playList';

class User {
	private uid: string = '';
	cookie: string = '';
	isLogIn = false;
	playLists: PlayList[] = [];
	LogIn(id: any, cookie: any) {
		this.cookie = cookie.toString();
		this.uid = id.toString();
		this.isLogIn = true;
		//this.getAllPlaylists();
	}
	LogOut() {
		axios.get(`${serverPath}/logout?realIP=${realIP}`);
	}

	getAllPlaylists() {
		axios
			.get(`${serverPath}/user/playlist?uid=${this.uid}&realIP=${realIP}`)
			.then((res) => {
				this.playLists = res.data.playlist.map(
					(v: any) => new PlayList(v.id, this.cookie)
				);
			});
	}

	get id() {
		return this.uid;
	}
}

export const user = new User();
