import { useState } from 'react';
import './UserForm.scss';
import { User } from './User';
import {Modal} from "./Modal";
import './modal.scss';

interface UserFormProps {
    onSubmit: (user: User) => void;
}

export default function UserForm({onSubmit}: UserFormProps) {
    const [name, setName] =  useState('');
    const css = 'shared-draft-comment-modal';
    return (
        <Modal>
            <div className={`${css}__container`}>
                <h2 className={`${css}__header`}>Tell us your name</h2>
                <div className={`${css}__content`}>
                    <label className={`${css}__content-label`}>Name</label>
                    <input className={`${css}__field`} type="text" name="name" value={name} onChange={(event) => setName(event.target.value)} />
                    <button className={`${css}__button ${css}__button--primary`} onClick={() => onSubmit({id: '', name})}>Start</button>
                </div>
            </div>
        </Modal>
    )
}
