import React from 'react';
import ReactDOM from 'react-dom/client';
import Highlighter from 'web-highlighter';
import CommentContainer from './CommentContainer';
import { InlineSelection } from './InlineSelection';
import Bubble from './Bubble';
import { Comment } from './Comment';

function clearBubble() {
  let bubble = document.querySelector('.bubble-wrapper');
  if (bubble !== null) {bubble.remove();}
}

export function InlineComment(
  getSelections: () => Promise<InlineSelection[]>,
  getComments: (selectionId?: string) => Comment[],
  registerSelection: (selection: InlineSelection) => void,
  postComment: (selectionId: string, text: string) => void,
  root: HTMLElement,
) {
  const highlighter = new Highlighter();
  let selectionId = '';

  getSelections().then(
    selections => selections.forEach(s => highlighter.fromStore(s.startMeta, s.endMeta, s.text, s.id))
  );

  const reactDiv = document.createElement('div');
  document.body.appendChild(reactDiv);

  const reactRoot = ReactDOM.createRoot(reactDiv);
  const refresh = () => {
    getSelections().then(selections => {
      const activeSelection = selections.find(({id}) => id === selectionId)
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
    })

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
    clearBubble()

    const selection = document.getSelection();
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
            onClick={() => {
              highlighter.fromRange(selection.getRangeAt(0))
              clearBubble()
            }} />
        </React.StrictMode>
      );
    }
  };

  return refresh

}

