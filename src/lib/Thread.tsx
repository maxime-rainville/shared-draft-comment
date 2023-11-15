import { useState } from 'react';
import { RootState } from '../Store';
import './Thread.scss';
import SingleComment from './SingleComment';

interface ThreadProps {
    offset: number;
    comments: RootState["Selection"]["comments"];
    onNewComment: (text: string) => void;
}

interface SyntheticBaseEvent {
    key: string;
}

export default function Thread({offset, comments, onNewComment}: ThreadProps) {
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
        <div style={{position: 'absolute', top: offset}} className='thread'>
            {comments.map((user) => <SingleComment key={user.id} {...user} />)}
            <div className="new-comment">
                <input className={`new-comment__field ${emptyComment ? 'new-comment__field--error' : ''}`} placeholder="Reply" onKeyDown={validateKeyAndContent} value={newComment} onChange={event => setNewComment(event.target.value)}></input>
            </div>
        </div>
    )
}
