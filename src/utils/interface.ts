/* eslint-disable no-unused-vars */
import { Comment, CommentUtil } from './comment';
import { Song } from './song';

export interface HaveComment {
	comments: CommentUtil;
	getComments(): Promise<void | Comment[]>;
}

export interface SongSet {
	trackIds: string[];
	getSongs(cookie: string): Promise<void | Song[]>;
}
