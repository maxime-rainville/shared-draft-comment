import { useState } from 'react';
import { RootState } from '../Store';
import './Thread.scss';
import SingleComment from './SingleComment';

interface ThreadProps {
  offset: number;
  comments: RootState["Selection"]["comments"];
  onNewComment: (text: string) => void;
}

export default function Thread({offset, comments, onNewComment}: ThreadProps) {
    const [newComment, setNewComment] =  useState('');

    const postComment = () => {
        setNewComment('');
        onNewComment(newComment);
    }

    return (
        <div style={{position: 'absolute', top: offset}} className='thread'>
            {comments.map((user) => <SingleComment key={user.id} {...user} />)}
            <div className="new-comment">
                <textarea value={newComment} onChange={event => setNewComment(event.target.value)}></textarea>
                <button onClick={postComment}>Post</button>    
            </div>
        </div>
    )
}
