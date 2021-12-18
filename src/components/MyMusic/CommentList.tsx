import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { Comment, HaveComment } from '../../utils/comment';
import './style/commentList.scss';

// 歌单评论
//TODO 扩展为歌单和歌曲的评论

const CommentItem = (props: { comment: Comment }) => {
	const [avatar, setAvatar] = useState('');
	useEffect(() => {
		let img = new Image();
		img.src = props.comment.avatar;
		img.onload = () => {
			setAvatar(img.src);
			img.onload = null;
		};
		return () => {
			img.onload = null;
		};
	}, [props.comment]);
	return (
		<li className="comment-list-item">
			<div className="comment-list-item-wrapper">
				<div className="comment-list-item-avatar">
					<img src={avatar}></img>
				</div>
				<div className="comment-list-item-col-1">
					<p className="comment-list-item-content">
						<span className="comment-list-item-name">
							{props.comment.name + '  :'}
						</span>
						{props.comment.content}
					</p>
					<p className="comment-list-item-time">
						{props.comment.timeStr}
					</p>
				</div>
			</div>
		</li>
	);
};
const CommentListTitle = () => {
	return (
		<div className="comment-title">
			<span>最新评论</span>
		</div>
	);
};
export const CommentList = observer((props: { active: HaveComment }) => {
	const [comments, setComments] = useState([] as Comment[]);
	useEffect(() => {
		setComments([]);
		props.active?.getComments(setComments);
	}, [props.active]);
	return (
		<div className="comment-wrapper">
			<CommentListTitle />
			{comments.length ? (
				<>
					<ul className="comment-list">
						{comments.map((v, i) => (
							<CommentItem comment={v} key={i} />
						))}
					</ul>
				</>
			) : null}
		</div>
	);
});
