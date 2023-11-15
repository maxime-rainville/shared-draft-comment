import { useState } from 'react';
import './UserForm.scss';
import { User } from './User';

interface UserFormProps {
  onSubmit: (user: User) => void;
}

export default function UserForm({onSubmit}: UserFormProps) {
    const [firstName, setFirstName] =  useState('');
    const [surname, setSurname] =  useState('');


    return (
        <div className='user-form'>
            <label>First name</label>
            <input type="text" name="firstName" value={firstName} onChange={(event) => setFirstName(event.target.value)} />

            <label>Surname</label>
            <input type="text" name="surname" value={surname} onChange={(event) => setSurname(event.target.value)} />

            <button onClick={() => onSubmit({id: '', firstName, surname})}>Create User</button>
        </div>
    )
}
