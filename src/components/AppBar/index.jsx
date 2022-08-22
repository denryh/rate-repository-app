import { View, StyleSheet, ScrollView } from "react-native";
import { Link } from "react-router-native";

import { useQuery, useApolloClient } from "@apollo/client";
import { SIGNED_IN } from "../../graphql/queries";
import useAuthStorage from "../../hooks/useAuthStorage";

import Constants from "expo-constants";
import theme from "../../theme";
import AppBarTab from "./AppBarTab";

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
    const { data, error, loading } = useQuery(SIGNED_IN);
    const apolloClient = useApolloClient();
    const authStorage = useAuthStorage();

    if (loading) return null;
    if (error) {
        console.log(error);
        return null;
    }

    const signOut = async () => {
        await authStorage.removeAccessToken();
        apolloClient.resetStore();
    };

    return <View style={styles.container}>
        <ScrollView horizontal>
            <Link to='/' style={styles.tab}>
                <AppBarTab text="Repositories" />
            </Link>
            {data.me
                ? <AppBarTab style={styles.tab} text="Sign out" onPress={signOut} />
                : <Link to='/signin' style={styles.tab}>
                    <AppBarTab text="Sign in" />
                </Link>
            }
        </ScrollView>
    </View>;
};

export default AppBar;