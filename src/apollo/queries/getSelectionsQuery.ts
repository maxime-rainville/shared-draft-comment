import { gql } from '@apollo/client'

export const getSelectionsQuery = gql`
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
`
