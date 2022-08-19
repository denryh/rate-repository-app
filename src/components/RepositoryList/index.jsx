import { useQuery } from '@apollo/client';
import { FlatList, View, StyleSheet } from 'react-native';

import { GET_REPOSITORIES } from '../../graphql/queries'

import RepositoryItem from './RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const { data, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network'
  })

  if (loading) return null;

  const repositoryNodes = data.repositories.edges.map(edge => edge.node)

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem key={item.id} item={item} />}
    />
  );
};

export default RepositoryList;