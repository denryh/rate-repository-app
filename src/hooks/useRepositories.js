import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (order, searchKeyword) => {
    const { data } = useQuery(GET_REPOSITORIES, {
        variables: {
            searchKeyword,
            ...order
        },
        fetchPolicy: "cache-and-network"
    });

    return { repositories: data?.repositories };
};

export default useRepositories;