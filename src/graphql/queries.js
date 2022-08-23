import { gql } from "@apollo/client";
import { BASE_REPOSITORY_FIELDS } from "./fragments";

export const GET_REPOSITORIES = gql`
    ${BASE_REPOSITORY_FIELDS}
    query GetRepositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
        repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
            edges {
                node {
                    ...BaseRepositoryFields
                }
            }
        }
    }
`;

export const GET_REPO = gql`
    ${BASE_REPOSITORY_FIELDS}
    query GetRepo($repoId: ID!) {
        repository(id: $repoId) {
            ...BaseRepositoryFields,
            url,
            reviews {
                edges {
                    node {
                        id
                        text
                        rating
                        createdAt
                        user {
                            id
                            username
                        }
                    }
                }
            }
        }
    }
`;

export const SIGNED_IN = gql`
    query SignedIn {
        me {
            id
            username
        }
    }
`;