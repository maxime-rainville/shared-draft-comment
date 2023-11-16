import React from 'react'
import Highlighter from 'web-highlighter';
import Thread from './Thread';
import { InlineSelection } from './InlineSelection';
import { Comment } from './Comment';
import './CommentContainer.scss';

interface Props {
    closeCommentThread: () => void
}

export default function CommentContainerHeader({closeCommentThread}: Props) {
    return (
        <div className='comment-container--header'>
            <div className='comment-container--header__bubble'>💬</div>
            <div className='comment-container--header__text'>Comments</div>
            <a href="#" className='comment-container--header__close' onClick={(event) => {
                event.preventDefault();
                closeCommentThread();
            }}>❌</a>
        </div>
    );
}
