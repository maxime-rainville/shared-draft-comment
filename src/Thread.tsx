import { useState } from 'react';
import { RootState } from './Store';
import './Thread.scss';

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
            {comments.map(({id, text}) => <div key={id} className="comment">{text}</div>)}
            <div className="new-comment">
                <textarea value={newComment} onChange={event => setNewComment(event.target.value)}></textarea>
                <button onClick={postComment}>Post</button>    
            </div>
        </div>
    )
}
