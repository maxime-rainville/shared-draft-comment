import { ApolloClient, InMemoryCache } from '@apollo/client';
import { InlineComment } from './lib/InlineComment';
import { InlineSelection } from './lib/InlineSelection';
import { getSelectionsQuery } from './apollo/queries/getSelectionsQuery';
import { postDomMetaMutation } from './apollo/mutations/postDomMetaMutation';
import { getCommentsQuery } from './apollo/queries/getCommentsQuery';
import { recallUser } from './apollo/recallUser';
import { postCommentMutation } from './apollo/mutations/postCommentMutation';
import { postSelectionMutation } from './apollo/mutations/postSelectionMutation';
import { User } from './lib/User';

export async function  apolloBootstrap(pageID: number) {
    let refreshInlineComment: () => void;

    const client = new ApolloClient({
        uri: 'shared-draft-comment/graphql',
        cache: new InMemoryCache(),
        defaultOptions: {
            watchQuery: {
                fetchPolicy: 'no-cache',
                errorPolicy: 'ignore',
            },
            query: {
                fetchPolicy: 'no-cache',
                errorPolicy: 'all',
            },
        }
    });

    let user: User;

    const getSelections = () => client.query({
        query: getSelectionsQuery,
        variables: { pageID },
    }).then(result => {
        return result.data.readSelections;
    });

    const postSelection = (selection: InlineSelection) => client.mutate({
        mutation: postDomMetaMutation,
        variables: {'startMeta': selection.startMeta, 'endMeta': selection.endMeta},
    }).then(({data: {startMeta, endMeta}}) => (
        client.mutate({
            mutation: postSelectionMutation,
            variables: {
                selection: {
                    startMetaID: startMeta.id,
                    endMetaID: endMeta.id,
                    text: selection.text,
                    pageID,
                }
            }
        })
            .then(results => results.data?.createSelection)
    ));


    const getComments = (selectionID?: string) => client.query({
        query: getCommentsQuery,
        variables: {selectionID}
    }).then(({data: {readComments}}) => readComments.map((comment: { created: string | number | Date; }) => ({...comment, created: new Date(comment.created)})));
    const postComment = (selectionID: string, content: string) => {
        return recallUser(client).then(newUser => {
            user = newUser
        })
            .then(() => client.mutate({
                mutation: postCommentMutation,
                variables: {comment: {selectionID, content, commenterID: user.id}}
            })).then(refreshInlineComment);

    }

    // Start up InlineComment anh link it to our redux store
    const body = document.querySelector('article')
    if (body) {
        refreshInlineComment = InlineComment(
            getSelections,
            getComments,
            postSelection,
            postComment,
            body
        );
    }
}
