import React from 'react';
import ReactDOM from 'react-dom/client';
import Highlighter from 'web-highlighter';
import CommentContainer from './CommentContainer';
import { InlineSelection } from './InlineSelection';
import Bubble from '../Bubble';
import { Comment } from './Comment';


export function InlineComment(
  getSelections: () => InlineSelection[],
  getComments: (selectionId?: string) => Comment[],
  registerSelection: (selection: InlineSelection) => void,
  postComment: (selectionId: string, text: string) => void,
  root: HTMLElement,
) {
  const highlighter = new Highlighter();
  let selectionId = '';

  const selections = getSelections();
  selections.forEach(s => highlighter.fromStore(s.startMeta, s.endMeta, s.text, s.id))

  const reactDiv = document.createElement('div');
  document.body.appendChild(reactDiv);

  const reactRoot = ReactDOM.createRoot(reactDiv);
  const refresh = () => {
    const activeSelection = getSelections().find(({id}) => id === selectionId);
    const comments = getComments(selectionId || '');
    reactRoot.render(
    <React.StrictMode>
      <CommentContainer 
        highlighter={highlighter}
        activeSelection={activeSelection}
        comments={comments}
        postComment={(text) => postComment(selectionId || '', text )} />
    </React.StrictMode>
    )
  };

  highlighter.on(
    Highlighter.event.CREATE, 
    ({sources}) => sources.forEach( (source) => {
      selectionId = source.id
      registerSelection(source)
     })
  );

  highlighter.on(Highlighter.event.CLICK, ({id}) => {
    selectionId = id;
    refresh()
  });
  
  root.onpointerup = () => {
    const selection = document.getSelection();

    let bubble = document.querySelector('.bubble-wrapper');
    if (bubble !== null) {bubble.remove();}

    if (selection === null) return;
    const text = selection.toString();
    if (text !== "") {
      // debugger;
      let rect = selection.getRangeAt(0).getBoundingClientRect();
      const control = document.createElement('div');
      control.className = 'bubble-wrapper';
      document.body.appendChild(control);
      const bubbleRoot = ReactDOM.createRoot(control);
      bubbleRoot.render(
        <React.StrictMode>
          <Bubble 
            top={rect.top + document.documentElement.scrollTop}
            left={rect.left+rect.width/2} 
            onClick={() => highlighter.fromRange(selection.getRangeAt(0))} />
        </React.StrictMode>
      );
    }
  };

  return refresh

}



// import {useState} from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { SelectionState, actions } from './Store/Selection';
// import { RootState } from './Store';
// import Highlighter from 'web-highlighter';
// import Thread from './Thread';

// interface CommentContainerProps {
//     highlighter: Highlighter
// }

// export default function CommentContainer({highlighter}: CommentContainerProps) {

//     const activeSelection = useSelector(({Selection: {selections, activeSelectionId}}: RootState) => selections.find(({id}) => id === activeSelectionId));
//     const comments = useSelector(({Selection: {comments}}: RootState) => activeSelection && comments.filter(({selectionId}) => selectionId === activeSelection.id));
//     const dispatch = useDispatch();
    
//     if (activeSelection && comments) {
//         const domElements = highlighter.getDoms(activeSelection.id);
//         const el = domElements[0];
//         const offset = window.pageYOffset + el.getBoundingClientRect().top;
//         return <Thread offset={offset} comments={comments} onNewComment={text => dispatch(actions.newComment(text))}/>;
//     } else {
//         return <div>There's active selection</div>;
//     }
// }
