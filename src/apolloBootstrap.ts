import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { InlineComment } from './lib/InlineComment';
import { InlineSelection } from './lib/InlineSelection';


export function apolloBootstrap(pageID: number) {
    let refreshInlineComment: () => void;

    const client = new ApolloClient({
        uri: 'shared-draft-comment/graphql',
        cache: new InMemoryCache(),
    });

    console.log(pageID);
    const getSelections = () => client.query({
        query: gql`
            query getSelections($pageID: ID) {
                readSelections(filter: {pageID: {eq: $pageID}}) {
                    id
                    endMeta {
                        created
                        textOffset
                        parentTagName
                        parentIndex
                    }
                    startMeta {
                        created
                        textOffset
                        parentTagName
                        parentIndex
                    }
                    text
                }
            }
        `,
        variables: { pageID },
    }).then(result => {
        return result.data.readSelections;
    });

    const postSelection = (selection: InlineSelection) => client.mutate({
        mutation: gql`
            mutation postDomMeta($start: CreateDomMetaInput!, $end: CreateDomMetaInput!) {
                startMeta: createDomMeta(input:$start) {
                    id
                }
                endMeta: createDomMeta(input:$end) {
                    id
                }
            }
        `,
        variables: {start: selection.startMeta, end: selection.endMeta},
    }).then(({data: {startMeta, endMeta}}) => (
        client.mutate({
            mutation: gql`
                mutation postSelection($selection: CreateSelectionInput!) {
                    createSelection(input:$selection) {
                        id
                    }
                }
            `,
            variables: {
                selection: {
                    startMetaID: startMeta.id,
                    endMetaID: endMeta.id,
                    text: selection.text,
                    pageID,
                }
            }
        })
    )).then(refreshInlineComment);



    // Start up InlineComment anh link it to our redux store
    const body = document.querySelector('article')
    if (body) {
        refreshInlineComment = InlineComment(
            getSelections,
            (selectionId?: string) => [],
            postSelection,
            (selectionId: string, text: string) => {},
            body
        );
    }
}


// }
