/* eslint-disable no-unused-vars */
import { Comment, CommentUtil } from './obj/comment';
import { SongUtil } from './SongUtil';

export interface HaveComment {
	comments: CommentUtil;
	getComments(): Promise<void | Comment[]>;
}

export interface HaveSongSet {
	songSet: SongUtil;
	getSongs(cookie: string): Promise<void | SongUtil>;
}
