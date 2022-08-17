import Constant from 'expo-constants';
import { Text, StyleSheet, View } from 'react-native';
import RepositoryList from './components/RepositoryList';

const styles = StyleSheet.create({
    container: {
        marginTop: Constant.statusBarHeight,
        flexGrow: 1,
        flexShrink: 1,
    }
})

const Main = () => {
    return (
        <View style={styles.container}>
            <Text>Rate Repository App</Text>
            <RepositoryList />
        </View>
    )
}

export default Main