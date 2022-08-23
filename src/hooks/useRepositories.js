import { useQuery } from "@apollo/client";
import { GET_REPOSITORIES } from "../graphql/queries";

const useRepositories = (order) => {
    const { data } = useQuery(GET_REPOSITORIES, {
        variables: {
            ...order
        },
        fetchPolicy: "cache-and-network"
    });

    return { repositories: data?.repositories };
};

export default useRepositories;