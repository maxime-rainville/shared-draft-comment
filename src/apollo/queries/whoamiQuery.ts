import { gql } from '@apollo/client'

export const whoamiQuery = gql`
query {
    whoami {
        name
        avatar
    }
}
`
