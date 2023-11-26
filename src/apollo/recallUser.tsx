import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { User } from '../lib/User';
import UserForm from '../lib/UserForm';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { postCommenterMutation } from './mutations/postCommenterMutation';


function askForUser(): Promise<User> {
    return new Promise((resolve) => {
      const rootEl = document.createElement('div');
      document.body.appendChild(rootEl);
      const root = ReactDOM.createRoot(rootEl);
      const onSubmit = (user: User) => {
        root.unmount();
        rootEl.remove();
        resolve(user);
      };
      root.render(
        <React.StrictMode>
          <UserForm onSubmit={onSubmit} />
        </React.StrictMode>
      )
    })
  }

export function recallUser(client: ApolloClient<NormalizedCacheObject>): Promise<User> {
    const commenterJSON = window.sessionStorage.getItem('commenter');

    if (commenterJSON) {
        const commenter = JSON.parse(commenterJSON);
        return Promise.resolve(commenter);
    }

    return askForUser().then(user => (
        client.mutate({
            mutation: postCommenterMutation,
            variables: {commenter: user}
        })
    )).then(results => {
        const commenter = results.data.createCommenter
        window.sessionStorage.setItem('commenter', JSON.stringify(commenter))
        return commenter;
    })

}



