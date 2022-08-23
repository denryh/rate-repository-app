import useRepositories from "../../hooks/useRepositories";

import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import { useState } from "react";
import Order from "./Order";

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
    const [order, setOrder] = useState({
        orderBy: "CREATED_AT",
        orderDirection: "DESC",
    });

    const { repositories } = useRepositories(order);

    return <>
        <Order setOrder={setOrder} />
        {repositories ? <RepositoryListContainer repositories={repositories} /> : null }
    </>;
};

export default RepositoryList;