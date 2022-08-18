import { View, StyleSheet, ScrollView } from 'react-native'
import { Link } from 'react-router-native'

import Constants from 'expo-constants'
import theme from '../theme';
import AppBarTab from './AppBarTab';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.background.appBar,
  },
  tab: {
    padding: 15
  }
});

const AppBar = () => {
  return <View style={styles.container}>
    <ScrollView horizontal>
      <Link to='/' style={styles.tab}>
        <AppBarTab text="Repositories" />
      </Link>
      <Link to='/login' style={styles.tab}>
        <AppBarTab text="Sign in" />
      </Link>
    </ScrollView>
  </View>;
};

export default AppBar;