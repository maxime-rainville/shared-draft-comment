import { gql } from '@apollo/client'

export const postCommenterMutation = gql`
mutation postCommenterMutation($commenter: CreateCommenterInput!) {
  createCommenter(input: $commenter) {
    id
    firstName
    surname
  }
}
`
