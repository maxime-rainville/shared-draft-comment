import { useState } from 'react';
import './UserForm.scss';
import { User } from './User';
import {Modal} from "./Modal";
import './modal.scss';

interface UserFormProps {
    onSubmit: (user: User) => void;
}

export default function UserForm({onSubmit}: UserFormProps) {
    const [firstName, setFirstName] =  useState('');
    const [surname, setSurname] =  useState('');

    return (
        <Modal>
            <div className='modal__container'>
                <h2 className="modal__header">Tell us your name</h2>
                <div className="modal__content">
                    <label className="modal__content-label">First name</label>
                    <input className="modal__field" type="text" name="firstName" value={firstName} onChange={(event) => setFirstName(event.target.value)} />
                    <label className="modal__content-label">Surname</label>
                    <input className="modal__field" type="text" name="surname" value={surname} onChange={(event) => setSurname(event.target.value)} />

                    <button className="modal__button modal__button--primary" onClick={() => onSubmit({id: '', firstName, surname})}>Start</button>
                </div>
            </div>
        </Modal>
    )
}
