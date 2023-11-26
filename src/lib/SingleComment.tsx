import './SingleComment.scss';
import { Comment } from './Comment';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import Avatar from './Avatar';

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')


export default function SingleComment({content, created, author}: Comment) {

    const name = author ? author.name : 'Anonymous';
    return (
        <div className="comment">
            <Avatar {...author} />
            <div className="comment__author">{name}</div>
            <div className="comment__created">{timeAgo.format(created)}</div>
            <div className="comment__text">{content}</div>
        </div>
    )
}
