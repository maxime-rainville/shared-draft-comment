import { gql } from '@apollo/client'

export const getCommentsQuery = gql`
query getComments($selectionID: ID) {
  readComments(filter: {selectionID: {eq: $selectionID}}) {
    id
    content
    created
    author {
      name
      avatar
    }
  }
}
`
