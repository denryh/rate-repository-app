import { Image, View, StyleSheet } from 'react-native'
import theme from '../../theme'
import Text from '../Text'

const mainStyles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingVertical: 10,
    }
})

const RepositoryItem = ({ item }) => {
    return <View style={mainStyles.container}>
        <Info
            avatar={item.ownerAvatarUrl} 
            fullName={item.fullName} 
            description={item.description}
            language={item.language} />
        <Counts 
            stars={item.stargazersCount}
            forks={item.forksCount}
            reviews={item.reviewCount}
            rating={item.ratingAverage}
        />
    </View>
}

const infoStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
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
        alignSelf: 'flex-start'
    }
})

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
    </View>
}

const countStyles = StyleSheet.create({
    container: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
        textAlign: 'center',
    }
})

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
    </View>
}

export default RepositoryItem