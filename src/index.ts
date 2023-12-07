import './index.css';
import {reduxBootstrap} from './reduxBootstrap';
import {apolloBootstrap} from './apolloBootstrap';
import React from 'react';
import {render} from 'react-dom';
import InfoModal from "./lib/Modal";

declare global {
  var sharedDraftComment: any;
}

window.addEventListener('load', function () {
  if (window.sharedDraftComment === undefined) {
    reduxBootstrap();
  } else {
    const {pageID, graphqlUrl, selector} = window.sharedDraftComment;
    apolloBootstrap(pageID, graphqlUrl, selector);
  }
})

const modalContainer =  document.createElement('div');
render(React.createElement(InfoModal),modalContainer);
document.body.appendChild(modalContainer);
