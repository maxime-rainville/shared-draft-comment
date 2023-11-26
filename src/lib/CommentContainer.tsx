import React from 'react'
import Highlighter from 'web-highlighter';
import Thread from './Thread';
import { InlineSelection } from './InlineSelection';
import { Comment } from './Comment';
import './CommentContainer.scss';
import CommentContainerHeader from './CommentContainerHeader';
import { User } from './User';

interface CommentContainerProps {
    highlighter: Highlighter,
    activeSelection?: InlineSelection,
    comments: Comment[]
    postComment: (text: string) => void,
    closeCommentThread: () => void,
    currentUser: User | null,
}

export default function CommentContainer({highlighter, activeSelection, comments, postComment, closeCommentThread, currentUser}: CommentContainerProps) {
    if (activeSelection && comments) {
        const domElements = highlighter.getDoms(activeSelection.id);
        const el = domElements[0];
        const offset = window.pageYOffset + el.getBoundingClientRect().top;
        return (
            <div className='comment-container' style={{top: offset}}>
                <CommentContainerHeader closeCommentThread={closeCommentThread} />
                <Thread offset={offset} comments={comments} onNewComment={postComment} currentUser={currentUser}/>
            </div>
        );
    }

    return null;
}
