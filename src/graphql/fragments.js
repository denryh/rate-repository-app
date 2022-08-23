import { gql } from "@apollo/client";

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
`;

export const BASE_REVIEW_FIELDS = gql`
    fragment BaseReviewFields on Review {
        id
        text
        rating
        createdAt
        repository {
            fullName
            id
        }
        user {
            id
            username
        }
    }
`;