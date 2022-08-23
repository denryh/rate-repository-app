import { useMutation, useQuery } from "@apollo/client";
import { SIGNED_IN } from "../graphql/queries";
import { DELETE_REVIEW } from "../graphql/mutations";
import { FlatList, View, StyleSheet, Alert } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { format, parseISO } from "date-fns";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import { useNavigate } from "react-router-native";

const ItemSeperator = () => <View style={{ height: 10 }}></View>;

const reviewItemStyles = StyleSheet.create({
    container: {
        backgroundColor: "white",
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
    button: {
        backgroundColor: theme.colors.primary,
        paddingVertical: 20,
        paddingHorizontal: 35,
        marginTop: 15,
        borderRadius: 3,
    },
    flexOne: {
        flex: 1,
    },
    flexRow: {
        flexDirection: "row"
    },
});

const ReviewItem = ({ review, refetch }) => {
    const navigate = useNavigate();
    const [deleteReview] = useMutation(DELETE_REVIEW); 

    const onDelete = () => {
        Alert.alert(
            "Delete review", 
            "Are you sure you want to delete this review?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: () => {
                        deleteReview({ variables: { deleteReviewId: review.id }});
                        refetch({ 
                            includeReviews: true,
                            first: 2, 
                        });
                    }
                },
            ]
        );
    };

    return ( 
        <View style={reviewItemStyles.container}>
            <View style={reviewItemStyles.flexRow}>
                <View style={reviewItemStyles.rating}>
                    <Text>{review.rating}</Text>
                </View>
                <View style={reviewItemStyles.flexOne}>
                    <Text fontWeight="bold">{review.repository.fullName}</Text>
                    <Text color="textSecondary">{format(parseISO(review.createdAt), "dd.MM.yyyy")}</Text>
                    <Text style={{ marginTop: 10 }}>{review.text}</Text>
                </View>
            </View>
            <View style={[reviewItemStyles.flexRow, { justifyContent: "space-between" }]}>
                <Pressable onPress={() => navigate(`/${review.repository.id}`)} style={reviewItemStyles.button}>
                    <Text fontWeight="bold" style={{ textAlign: "center", color: "white" }}>View repository</Text>
                </Pressable>
                <Pressable onPress={onDelete} style={[reviewItemStyles.button, { backgroundColor: "crimson" } ]}>
                    <Text fontWeight="bold" style={{ textAlign: "center", color: "white" }}>Delete review</Text>
                </Pressable>
            </View>
        </View>
    );
};

const UserReviews = () => {
    const { data, loading, error, fetchMore, refetch } = useQuery(SIGNED_IN, {
        variables: {
            includeReviews: true,
            first: 2,
        },
        fetchPolicy: "cache-and-network"
    });

    if (loading) return null;
    if (error) return console.log(error.message) || null;

    const reviewNodes = data.me ? data.me.reviews.edges.map(edge => edge.node) : [];

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
        renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} />}
        onEndReached={onEndReached}
    />;
};

export default UserReviews;