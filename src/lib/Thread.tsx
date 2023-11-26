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

    return (
        <div className='thread'>
            {comments.map((user) => <SingleComment key={user.id} {...user} />)}
            <div className="new-comment">
                <Avatar {...currentUser} className='new-comment__avatar' />
                <input className={`new-comment__field ${emptyComment ? 'new-comment__field--error' : ''}`} placeholder="Reply" onKeyDown={validateKeyAndContent} value={newComment} onChange={event => setNewComment(event.target.value)}></input>
            </div>
        </div>
    )
}
