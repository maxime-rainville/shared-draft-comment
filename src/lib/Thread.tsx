import { useState } from 'react';
import './Thread.scss';
import SingleComment from './SingleComment';
import { User } from './User';
import { Comment } from './Comment';
import Avatar from './Avatar';

interface ThreadProps {
    offset: number;
    comments: Comment[];
    onNewComment: (text: string) => void;
    currentUser: User | null;
}

interface SyntheticBaseEvent {
    key: string;
}

export default function Thread({offset, comments, onNewComment, currentUser}: ThreadProps) {
    const [newComment, setNewComment] =  useState('');
    const [emptyComment, setEmptyComment] = useState(false);

    const validateKeyAndContent = (e: SyntheticBaseEvent) => {
        if (e.key !== 'Enter') {
            setEmptyComment(false);
            return;
        }

        if (newComment.length === 0) {
            setEmptyComment(true);
            return;
        }


        postComment();
    }

    const postComment = () => {
        setNewComment('');
        onNewComment(newComment);
    }

    const css = 'shared-draft-comment-new-comment';
    return (
        <div className='shared-draft-comment-thread'>
            {comments.map((user) => <SingleComment key={user.id} {...user} />)}
            <div className={css}>
                <Avatar {...currentUser} className={`${css}__avatar`} />
                <input className={`${css}__field ${emptyComment ? `${css}__field--error` : ''}`} placeholder="Reply" onKeyDown={validateKeyAndContent} value={newComment} onChange={event => setNewComment(event.target.value)}></input>
            </div>
        </div>
    )
}
