import { useQuery } from "@apollo/client";
import { SIGNED_IN } from "../graphql/queries";
import { FlatList, View, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { format, parseISO } from "date-fns";

const ItemSeperator = () => <View style={{ height: 10 }}></View>;

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
            <Text fontWeight="bold">{review.repository.fullName}</Text>
            <Text color="textSecondary">{format(parseISO(review.createdAt), "dd.MM.yyyy")}</Text>
            <Text style={{ marginTop: 10 }}>{review.text}</Text>
        </View>
    </View>;
};

const UserReviews = () => {
    const { data, loading, error, fetchMore } = useQuery(SIGNED_IN, {
        variables: {
            includeReviews: true,
            first: 2,
        },
        fetchPolicy: "cache-and-network"
    });

    if (loading) return null;
    if (error) return console.log(error.message) || null;

    const reviewNodes = data.me.reviews.edges.map(edge => edge.node);

    const onEndReached = () => {
        const canFetchMore = !loading && data.me.reviews.pageInfo.hasNextPage;

        if (!canFetchMore) return;

        fetchMore({
            variables: {
                first: 2,
                after: data.me.reviews.pageInfo.endCursor,
                includeReviews: true,
            }
        });
    };
    
    return <FlatList 
        data={reviewNodes}
        ItemSeparatorComponent={ItemSeperator}
        renderItem={({ item }) => <ReviewItem review={item} />}
        onEndReached={onEndReached}
    />;
};

export default UserReviews;