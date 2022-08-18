import { View, StyleSheet, Pressable } from 'react-native'
import Text from './Text'
import Constants from 'expo-constants'
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: theme.background.appBar
  },
  tabText: {
    color: "#ffffff"
  }
});

const AppBar = () => {
  return <View style={styles.container}>
    <Pressable>
        <Text style={styles.tabText}>Repositories</Text>
    </Pressable>
  </View>;
};

export default AppBar;