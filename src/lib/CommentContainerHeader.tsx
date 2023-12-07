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
    const css = 'shared-draft-comment-comment-container--header'
    return (
        <div className={css}>
            <div className={`${css}__bubble`}>💬</div>
            <div className={`${css}__text`}>Comments</div>
            <a href="#" className={`${css}__close`} onClick={(event) => {
                event.preventDefault();
                closeCommentThread();
            }}>❌</a>
        </div>
    );
}
