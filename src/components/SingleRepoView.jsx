import { useParams } from "react-router-native";
import { useQuery } from "@apollo/client";
import * as Linking from "expo-linking";

import { GET_REPO } from "../graphql/queries";

import { Image, View, StyleSheet, Pressable } from "react-native";
import Text from "./Text";
import theme from "../theme";

const mainStyles = StyleSheet.create({
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
    }
});

const SingleRepoView = () => {
    const { id } = useParams();
    const { data, loading, error } = useQuery(GET_REPO, { variables: { repoId: id }});

    if (loading) return null;
    if (error) {
        console.log(error.message);
        return null;
    }

    const repository = data.repository;
    console.log(repository);
    
    const handlePress = () => {
        Linking.openURL(repository.url);
    };
    

    return <View style={mainStyles.container}>
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
        <Pressable onPress={handlePress} style={mainStyles.button}>
            <Text fontWeight="bold" style={{ color: "white", textAlign: "center" }}>Open in GitHub</Text>
        </Pressable>
    </View>;
};

const infoStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingHorizontal: 15,
    },
    ownerAvatar: {
        width: 40,
        height: 40,
        borderRadius: 3,
        marginRight: 15,
    },
    language: {
        backgroundColor: theme.colors.primary,
        borderRadius: 3,
        marginTop: 10,
        padding: 5,
        alignSelf: "flex-start"
    }
});

const Info = ({ avatar, fullName, description, language }) => {
    return  <View style={infoStyles.container}>
        <Image
            style   ={infoStyles.ownerAvatar}
            source={{
                uri: avatar
            }}
        />
        <View style={{ flex: 1 }}>
            <Text fontWeight="bold">{fullName}</Text>
            <Text color="textSecondary" style={{ marginTop: 5 }}>{description}</Text>
            <View style={infoStyles.language}>
                <Text style={{ color: "white" }}>{language}</Text>
            </View>
        </View>
    </View>;
};

const countStyles = StyleSheet.create({
    container: {
        marginTop: 15,
        flexDirection: "row",
        justifyContent: "space-around",
        textAlign: "center",
    }
});

const Counts = ({ stars, forks, reviews, rating }) => {
    return <View style={countStyles.container}>
        <View>
            <Text fontWeight="bold">{stars}</Text>
            <Text style={{ marginTop: 5 }}>Stars</Text>
        </View>
        <View>
            <Text fontWeight="bold">{forks}</Text>
            <Text style={{ marginTop: 5 }}>Forks</Text>
        </View>
        <View>
            <Text fontWeight="bold">{reviews}</Text>
            <Text style={{ marginTop: 5 }}>Reviews</Text>
        </View>
        <View>
            <Text fontWeight="bold">{rating}</Text>
            <Text style={{ marginTop: 5 }}>Rating</Text>
        </View>
    </View>;
};


export default SingleRepoView;