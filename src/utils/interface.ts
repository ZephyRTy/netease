/* eslint-disable no-unused-vars */
import { Comment, CommentUtil } from './model/comment';
import { SongSet } from './SongSet';

export interface HaveComment {
	comments: CommentUtil;
	getComments(): Promise<void | Comment[]>;
}

export interface HaveSongSet {
	songSet: SongSet;
	getSongs(): Promise<SongSet | void>;
}
