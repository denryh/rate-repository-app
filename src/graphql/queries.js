import { gql } from '@apollo/client'
import { BASE_REPOSITORY_FIELDS } from './fragments'

export const GET_REPOSITORIES = gql`
    ${BASE_REPOSITORY_FIELDS}
    query {
        repositories {
            edges {
                node {
                    ...BaseRepositoryFields
                }
            }
        }
    }
`