import React from 'react'
import Highlighter from 'web-highlighter';
import Thread from './Thread';
import { InlineSelection } from './InlineSelection';
import { Comment } from './Comment';

interface CommentContainerProps {
    highlighter: Highlighter,
    activeSelection?: InlineSelection,
    comments: Comment[]
    postComment: (text: string) => void
}

export default function CommentContainer({highlighter, activeSelection, comments, postComment}: CommentContainerProps) {
    if (activeSelection && comments) {
        const domElements = highlighter.getDoms(activeSelection.id);
        const el = domElements[0];
        const offset = window.pageYOffset + el.getBoundingClientRect().top;
        return <Thread offset={offset} comments={comments} onNewComment={postComment}/>;
    }

    return null;
}
