import './index.css';
import store, {actions} from './Store';
import { InlineComment } from './lib/InlineComment';
import { reduxBootstrap } from './reduxBootstrap';
import { apolloBootstrap } from './apolloBootstrap';

declare global {
  var sharedDraftComment: any;
}

window.addEventListener('load', function () {
  if (window.sharedDraftComment === undefined) {
    console.log('No sharedDraftComment object found. Using reduxBootstrap');
    reduxBootstrap();
  } else {
    console.log('Apollo magic here');
    apolloBootstrap(window.sharedDraftComment.pageID);
  }
})

const bodyDom = document.getElementsByTagName('body');
const modalContainer =  document.createElement('div');

render(React.createElement(Modal),modalContainer);
bodyDom[0].appendChild(modalContainer);