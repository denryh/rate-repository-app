import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client";
import * as Linking from "expo-linking";
import { format, parseISO } from "date-fns";

import { GET_REPO } from "../graphql/queries";

import { View, FlatList, StyleSheet, Pressable } from "react-native";
import { Info, Counts } from "./RepositoryList/RepositoryItem";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        backgroundColor: "white",
    },
    button: {
        marginTop: 15,
        marginHorizontal: 10,
        borderRadius: 5,
        padding: 20,
        backgroundColor: theme.colors.primary,
    },
    separator: {
        height: 10,
    }
});

const RepositoryInfo = ({ repository, handlePress }) => {
    return <View style={styles.container}>
        <Info
            avatar={repository.ownerAvatarUrl} 
            fullName={repository.fullName} 
            description={repository.description}
            language={repository.language} />
        <Counts 
            stars={repository.stargazersCount}
            forks={repository.forksCount}
            reviews={repository.reviewCount}
            rating={repository.ratingAverage}
        />
        <Pressable onPress={handlePress} style={styles.button}>
            <Text fontWeight="bold" style={{ color: "white", textAlign: "center" }}>Open in GitHub</Text>
        </Pressable>
    </View>;
};

const ItemSeparator = () => <View style={styles.separator} />;

const reviewItemStyles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flexDirection: "row",
        padding: 15,
    },
    rating: {
        width: 30,
        height: 30,
        borderRadius: 100,
        borderColor: theme.colors.primary,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 10,
    },
    flexOne: {
        flex: 1,
    }
});

const ReviewItem = ({ review }) => {
    return <View style={reviewItemStyles.container}>
        <View style={reviewItemStyles.rating}>
            <Text>{review.rating}</Text>
        </View>
        <View style={reviewItemStyles.flexOne}>
            <Text fontWeight="bold">{review.user.username}</Text>
            <Text color="textSecondary">{format(parseISO(review.createdAt), "dd.MM.yyyy")}</Text>
            <Text style={{ marginTop: 10 }}>{review.text}</Text>
        </View>
    </View>;
};

const SingleRepository = () => {
    const { id } = useParams();
    const { data, loading, error, fetchMore } = useQuery(GET_REPO, { 
        variables: { repoId: id, first: 2 }, 
        fetchPolicy: "cache-and-network"
    });

    if (loading) return null;
    if (error) return console.log(error.message) || null;

    const repository = data.repository;
    const reviewNodes = repository.reviews 
        ? repository.reviews.edges.map((edge) => edge.node)
        : [];
    
    const handlePress = () => {
        Linking.openURL(repository.url);
    };

    const onEndReached = () => {
        const canFetchMore = !loading && repository.reviews.pageInfo.hasNextPage;

        if (!canFetchMore) return null;

        fetchMore({
            variables: {
                repoId: id,
                first: 2,
                after: repository.reviews.pageInfo.endCursor,
            }
        });
    };
    
    return <>
        <RepositoryInfo handlePress={handlePress} repository={repository} />
        <ItemSeparator />
        <FlatList 
            data={reviewNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({ item }) => <ReviewItem key={item.id} review={item} />}
            onEndReached={onEndReached}
        />
    </>;
};

export default SingleRepository;