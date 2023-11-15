import './index.css';
import store, {actions} from './Store';
import { InlineComment } from './lib/InlineComment';
import { reduxBootstrap } from './reduxBootstrap';

declare global {
  var sharedDraftComment: any;
}

window.addEventListener('load', function () {
  if (window.sharedDraftComment === undefined) {
    console.log('No sharedDraftComment object found. Using reduxBootstrap');
    reduxBootstrap();
  } else {
    console.log('Apollo magic here');
  }
})

