import { gql } from '@apollo/client'

export const postCommentMutation = gql`
mutation postComment($comment: CreateCommentInput!) {
  createComment(input: $comment) {
    id
    created
    content
    commenter {
      id
      firstName
      surname
      hexCode
    }
    selectionID
  }
}
`
