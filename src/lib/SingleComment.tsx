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
            <div className="comment__avatar">
            <svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 0 512 512">
                <style>{'svg{fill:#43536d}'}</style>
                <path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/>
            </svg>
            </div>
            <div className="comment__author">{name}</div>
            <div className="comment__created">{timeAgo.format(created)}</div>
            <div className="comment__text">{content}</div>
        </div>
    )
}
