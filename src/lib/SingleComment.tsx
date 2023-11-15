import './SingleComment.scss';
import { Comment } from './Comment';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')


export default function SingleComment({content, created, commenter}: Comment) {

    const name = commenter ? `${commenter.firstName} ${commenter.surname}` : 'Anonymous';
    console.dir(created)
    return (
        <div className="comment">
            <div className="comment__avatar" style={{backgroundColor: commenter?.colour}}>
                {commenter?.avatar && <img src={commenter.avatar} alt={name}/> }
            </div>
            <div className="comment__author">{name}</div>
            <div className="comment__created">{timeAgo.format(created)}</div>
            <div className="comment__text">{content}</div>
        </div>
    )
}
