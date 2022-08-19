import { gql } from '@apollo/client'

export const BASE_REPOSITORY_FIELDS = gql`
    fragment BaseRepositoryFields on Repository {
        id
        fullName
        ratingAverage
        reviewCount
        stargazersCount
        forksCount
        ownerAvatarUrl
        description
        language
    }
`