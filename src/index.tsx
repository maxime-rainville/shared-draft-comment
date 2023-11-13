import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Bubble from './Bubble';
import Highlighter from 'web-highlighter';
import store, {actions} from './Store';
import { Provider } from 'react-redux'
import CommentContainer from './lib/CommentContainer';
import { InlineComment } from './lib/InlineComment';
import { InlineSelection } from './lib/InlineSelection';


// const highlighter = new Highlighter();

// store.subscribe(() => {
//   const {Selection: {selections, activeSelectionId}} = store.getState();
//   selections.forEach(
//     ({id}) => 
//       id === activeSelectionId ? 
//         highlighter.addClass('highlighter-active', id) : 
//         highlighter.removeClass('highlighter-active', id)
//   )
// })


store.dispatch(actions.Selection.addUser(
  {user: {id: 'previous', name: 'John Doe', email: 'john.doe@example.com', colour: '#ff0000'}}
));

store.dispatch(actions.Selection.addUser(
  {user: {id: 'active', name: 'Maxime Rainville', email: 'maxime.rainville@example.com', colour: '#00ff00'}, active: true}
));

store.dispatch(actions.Selection.register(
  {
    "startMeta": {
      "parentTagName": "P",
      "parentIndex": 1,
      "textOffset": 39
    },
    "endMeta": {
      "parentTagName": "P",
      "parentIndex": 1,
      "textOffset": 61
    },
    "text": "Sed rutrum ullamcorper",
    "id": "978827c9-2c2a-442c-b2a1-abd7ce6cdfc5"
  }
));

store.dispatch(actions.Selection.recallComment({
  id: 'comment1',
  text: 'This is a comment',
  userId: 'previous',
  selectionId: '978827c9-2c2a-442c-b2a1-abd7ce6cdfc5',
  created: new Date('2021-01-01T00:00:00Z')
}));

const body = document.querySelector('article')

if (body) {
  const refreshInlineComment = InlineComment(
    () => store.getState().Selection.selections,
    (selectionId?: string) => selectionId ?
      store.getState().Selection.comments.filter(c => c.selectionId === selectionId) :
      store.getState().Selection.comments,
    (selection: InlineSelection) => store.dispatch(actions.Selection.register(selection)),
    (selectionId: string, text: string) => store.dispatch(actions.Selection.newComment({selectionId, text})),
    body
  );

  store.subscribe(refreshInlineComment);
}