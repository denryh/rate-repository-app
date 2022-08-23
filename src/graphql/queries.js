import { gql } from "@apollo/client";
import { BASE_REPOSITORY_FIELDS, BASE_REVIEW_FIELDS } from "./fragments";

export const GET_REPOSITORIES = gql`
    ${BASE_REPOSITORY_FIELDS}
    query GetRepositories(
        $orderBy: AllRepositoriesOrderBy, 
        $orderDirection: OrderDirection, 
        $searchKeyword: String
        $first: Int,
        $after: String, 
    ) {
        repositories(
            orderBy: $orderBy,
            orderDirection: $orderDirection,
            searchKeyword: $searchKeyword
            after: $after,
            first: $first,
        ) {
            edges {
                node {
                    ...BaseRepositoryFields
                }
            }
            pageInfo {
                hasNextPage
                endCursor
            }
        }
    }
`;

export const GET_REPO = gql`
    ${BASE_REPOSITORY_FIELDS}
    ${BASE_REVIEW_FIELDS}
    query GetRepo($repoId: ID!, $first: Int, $after: String) {
        repository(id: $repoId) {
            ...BaseRepositoryFields,
            url,
            reviews(first: $first, after: $after) {
                edges {
                    node {
                        ...BaseReviewFields
                    }
                }
                pageInfo {
                    endCursor
                    hasNextPage
                }
            }
        }
    }
`;

export const SIGNED_IN = gql`
    ${BASE_REVIEW_FIELDS}
    query SignedIn($first: Int, $after: String, $includeReviews: Boolean = false) {
        me {
            id
            username
            reviews(first: $first, after: $after) @include(if: $includeReviews) {
                edges {
                    node {
                        ...BaseReviewFields
                    }
                }
                pageInfo {
                    endCursor
                    hasNextPage
                }
            }
        }
    }
`;