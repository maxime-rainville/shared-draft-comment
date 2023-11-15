import { gql } from '@apollo/client'

export const postDomMetaMutation = gql`
mutation postDomMeta($startMeta: CreateDomMetaInput!, $endMeta: CreateDomMetaInput!) {
    startMeta: createDomMeta(input: $startMeta) {
        id
    }
    endMeta: createDomMeta(input: $endMeta) {
        id
    }
}
`
