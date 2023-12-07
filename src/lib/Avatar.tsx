import './Avatar.scss';
import classnames from 'classnames';

interface AvatarProps {
    name?: string
    avatar?: string,
    className?: string
}

export default function Avatar({name, avatar, className}: AvatarProps) {

    return (
        <div className={classnames('shared-draft-comment-avatar', className)}>
            {avatar ?
                <img className="shared-draft-comment-avatar__image" src={avatar} alt={name} /> :
                <svg xmlns="http://www.w3.org/2000/svg" height="26px" viewBox="0 0 512 512">
                    <style>{'svg{fill:#43536d}'}</style>
                    <path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z"/>
                </svg>
            }
        </div>
    )
}
