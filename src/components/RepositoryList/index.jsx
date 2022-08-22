import { useQuery } from "@apollo/client";
import { FlatList, View, StyleSheet } from "react-native";

import { GET_REPOSITORIES } from "../../graphql/queries";

import RepositoryItem from "./RepositoryItem";

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
    const repositoryNodes = repositories
        ? repositories.edges.map((edge) => edge.node)
        : [];
  
    return (
        <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => <RepositoryItem key={item.id} item={item} />}
        />
    );
};

const RepositoryList = () => {
    const { data, loading, error } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: "cache-and-network"
    });

    if (loading) return null;
    if (error) {
        console.log(error.message);
        return null;
    }

    const repositories = data.repositories;

    return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;