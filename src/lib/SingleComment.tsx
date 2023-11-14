import './SingleComment.scss';
import { Comment } from './Comment';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')


export default function SingleComment({text, created, user}: Comment) {
    return (
        <div className="comment">
            <div className="comment__avatar" style={{backgroundColor: user?.colour}}>
                {user?.avatar && <img src={user.avatar} alt={user.name}/> }
            </div>
            <div className="comment__author">{user?.name}</div>
            <div className="comment__created">{timeAgo.format(created)}</div>
            <div className="comment__text">{text}</div>
        </div>
    )
}
