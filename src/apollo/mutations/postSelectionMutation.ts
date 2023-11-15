import { gql } from '@apollo/client'

export const postSelectionMutation = gql`
mutation postSelection($selection: CreateSelectionInput!) {
    createSelection(input:$selection) {
        id
        startMeta {
            parentIndex
            parentTagName
            textOffset
        }
        endMeta {
            parentIndex
            parentTagName
            textOffset
        }
        text
    }
}
`
