import './SingleComment.scss';
import { Comment } from './Comment';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import Avatar from './Avatar';

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')


export default function SingleComment({content, created, author}: Comment) {
    const css = 'shared-draft-comment-comment';
    const name = author ? author.name : 'Anonymous';
    return (
        <div className={css}>
            <Avatar {...author} />
            <div className={`${css}__author`}>{name}</div>
            <div className={`${css}__created`}>{timeAgo.format(created)}</div>
            <div className={`${css}__text`}>{content}</div>
        </div>
    )
}
