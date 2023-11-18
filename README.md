# Silverstripe CMS Comments on shared draft

This is a Silverstripe CMS module that adds the capability to leave comments on shared draft directly in the front end of your website.

## Warning

This is an experimental module. Use at your own risk.

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

The front end is divided into two main parts:
- the inline commenting library
- the data store part.

### Inline commenting library

The files stored under the `src/lib` are responsible for:
- displaying existing existing selections
- providing an interface to create new selections
- displaying comments
- recording new comments.

The inline commenting library is designed to be "store agnostic". Basically it doesn't care where its initial data is coming from and where newly created data goes. When the inline library get initialised, it expects a bunch of handlers it will then called to retrieve or update data.

This part was designed so it could be split off as its own library later on.

[web-highlighter](https://github.com/alienzhou/web-highlighter) is used to control the highlighting of text selection.

The UI is rendered with React.

### Data store

The logic to control the exchange of data with the backend via the GraphQL api is stored in `/src/apolloBootstrap.ts` and `/src/apollo`.

This is also responsible for providing an interface to record the commenter's details.

Basically, all the GraphQL queries and mutation are wrap in handlers that return promises. Those handlers are then uses to bootstrap the inline commenting library.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
