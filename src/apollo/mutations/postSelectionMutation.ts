import { gql } from '@apollo/client'

export const postSelectionMutation = gql`
mutation postSelection($selection: CreateSelectionInput!) {
    createSelection(input:$selection) {
        id
    }
}
`
