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
    return (
        <Modal>
            <div className='modal__container'>
                <h2 className="modal__header">Tell us your name</h2>
                <div className="modal__content">
                    <label className="modal__content-label">Name</label>
                    <input className="modal__field" type="text" name="name" value={name} onChange={(event) => setName(event.target.value)} />
                    <button className="modal__button modal__button--primary" onClick={() => onSubmit({id: '', name})}>Start</button>
                </div>
            </div>
        </Modal>
    )
}
