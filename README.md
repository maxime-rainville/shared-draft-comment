# Silverstripe CMS Comments on shared draft

This is a Silverstripe CMS module that adds the capability to leave comments on shared draft directly in the front end of your website.

## Warning

This is an experimental module. Use at your own risk.

## Team
- JS and PHP development
  - @aria5305
  - @maxime-rainville
- UX and UI
  - Oscar Urrutia
- User research and strategy
  - Erin Charter
- Other contributions
  - Claire Kirby
  - @SimulatedPanda
  - Maira Florez
  - @matthew-dyson
  - Sandra De Villiers
  - @tamatifkaa

## What does it do?

The [silverstripe/sharedraftcontent](https://github.com/silverstripe/silverstripe-sharedraftcontent) allows content authors to create special links to draft content. Content author can then choose to share those draft links with their stakeholders so they can preview the content.

However, any feedback on the draft content then has to be collected in side channels like email message or Google Doc.

This module extends the capability of the shared draft content module so people looking at a preview link can leave comment directly in the front end. Other users looking at the draft can view their comments and leave replies as well.

![Comment thread](https://github.com/maxime-rainville/shared-draft-comment/assets/1168676/722dac95-bdbb-44ba-85ff-1b666136db56)


https://github.com/maxime-rainville/shared-draft-comment/assets/1168676/63b94392-020f-4d98-a014-1b90da4dbefd

## How does it work?

### Backend

4 DataObjects are tracked:
- `Selection` which represent a specific sample of text on a specific page.
- `DomMeta` which define the start or the end of a selection. Each selection has a `startMeta` and a `endMeta`.
- `Comment` which represent a comment left on a specific selection. All comments attached to a selection are displayed together as a comment thread.
- `Commenter` which represent a person who posted one or more comments. Commenters don't have any credentials and no attempt is made to validate their name. This is done to remove any barrier before posting a comment.

The data can be retrieve and updated via a GraphQL endpoint at `/shared-draft-comment/graphql`.

### Frontend

The front end is divided into three main parts:
- the inline commenting library
- the Apollo Silverstripe CMS GraphQL data store
- the Redux test data store.

All the front end logic is written in TypeScript.

#### Inline commenting library

The files stored under the `src/lib` are responsible for:
- displaying existing existing selections
- providing an interface to create new selections
- displaying comments
- recording new comments.

The inline commenting library is designed to be "store agnostic". Basically it doesn't care where its initial data is coming from and where newly created data goes. When the inline library get initialised, it expects a bunch of handlers it will then called to retrieve or update data.

This part was designed so it could be split off as its own library later on.

[web-highlighter](https://github.com/alienzhou/web-highlighter) is used to control the highlighting of text selection.

The UI is rendered with React.

While commenter data is attached to each comment, the inline commenting library doesn't manage that data or give you the means to update that data. It is the responsibility of the data store to keep track of who the current user is and to make sure that any new comment are attached to that user. This is done to avoid mandating any specific approach to managing the identity of commenters.

#### Apollo Silverstripe CMS GraphQL data store

The logic to control the exchange of data with the Silverstripe CMS backend via GraphQL is stored in `/src/apolloBootstrap.ts` and `/src/apollo`.

This is also responsible for providing an interface to record the commenter's details.

Basically, all the GraphQL queries and mutation are wrapped in handlers that return promises. Those handlers are then uses to bootstrap the inline commenting library.

#### Redux test data store

A simple test Redux store is included in `/src/reduxBootstrap.ts` and `/src/Store`. It basically does the same thing as the apollo store, except the data is read for a redux state and the updates are managed via redux action.

This is only included to help test and update the inline commenting library. All changes are lost when you refresh the page. 

## Development 

### `npm run build`

To run the full Silverstripe CMS JS client, run `npm run build`. Performance optimisations have been disabled for now.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm start`

If you are just working on the inline commenting library, you can execute just that part with `npm start`.

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
