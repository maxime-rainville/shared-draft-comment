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
  getComments: (selectionId?: string) => Promise<Comment[]>,
  registerSelection: (selection: InlineSelection) => Promise<InlineSelection>,
  postComment: (selectionId: string, text: string) => void,
  root: HTMLElement,
) {

  const highlighter = new Highlighter();
  let selectionId = '';
  let refresh: () => void

  getSelections().then(
    selections => {
        selections.forEach(s => highlighter.fromStore(s.startMeta, s.endMeta, s.text, s.id))
        highlighter.on(
            Highlighter.event.CREATE,
            ({sources}) => sources.forEach( (source) => {
                if (selectionId === source.id) return
                selectionId = source.id
                registerSelection(source).then(updatedSelection => {
                    highlighter.remove(selectionId)
                    selectionId = updatedSelection.id
                    highlighter.fromStore(
                        updatedSelection.startMeta,
                        updatedSelection.endMeta,
                        updatedSelection.text,
                        updatedSelection.id
                    )
                    refresh()
                })
            })
        )
    }
  );

  const reactDiv = document.createElement('div');
  document.body.appendChild(reactDiv);

  const reactRoot = ReactDOM.createRoot(reactDiv);
  refresh = () => {
    getSelections().then(selections => {
      const activeSelection = selections.find(({id}) => id === selectionId)

      selections.forEach(({id}) =>
        id === activeSelection?.id ?
        highlighter.addClass('highlighter-active', id) :
        highlighter.removeClass('highlighter-active', id)
      )

      getComments(selectionId || '').then(comments => {
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
    })

  };

  highlighter.on(Highlighter.event.CLICK, ({id}) => {
    selectionId = id;
    refresh()
  });


  root.onpointerup = () => {
    clearBubble()
    selectionId = ''
    refresh()

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

