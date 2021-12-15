export class Comment {
	private _name = '';
	private _content = '';
	private _timeStamp = '';
	private _avatar = '';

	constructor(
		name: string,
		content: string,
		timeStamp: string,
		avatar: string
	) {
		this._content = content;
		this._name = name;
		this._timeStamp = timeStamp;
		this._avatar = avatar;
	}

	get name() {
		return this._name;
	}

	get content() {
		return this._content;
	}

	get avatar() {
		return this._avatar;
	}
}
