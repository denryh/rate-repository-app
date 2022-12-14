import useRepositories from "../../hooks/useRepositories";
import { useState } from "react";
import { useDebounce } from "use-debounce";

import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "./RepositoryItem";
import Order from "./Order";


const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories, fetchMore }) => {
    const repositoryNodes = repositories
        ? repositories.edges.map((edge) => edge.node)
        : [];
  
    const OnEndReached = () => {
        fetchMore();
    };

    return (
        <FlatList
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => <RepositoryItem key={item.id} item={item} />}
            onEndReached={OnEndReached}
        />
    );
};

const RepositoryList = () => {
    const [order, setOrder] = useState({
        orderBy: "CREATED_AT",
        orderDirection: "DESC",
    });

    const [searchKeyword, setSearchKeyword] = useState();
    const [value] = useDebounce(searchKeyword, 500);

    const variables = {
        ...order,
        searchKeyword: value,
        first: 2,
    };

    const { repositories, fetchMore } = useRepositories(variables);

    return <>
        <Order setOrder={setOrder} searchKeyword={searchKeyword} setSearchKeyword={setSearchKeyword} />
        {repositories ? <RepositoryListContainer repositories={repositories} fetchMore={fetchMore} /> : null }
    </>;
};

export default RepositoryList;