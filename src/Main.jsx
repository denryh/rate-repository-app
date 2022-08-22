import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";

import AppBar from "./components/AppBar";
import RepositoryList from "./components/RepositoryList";
import SignIn from "./components/SignIn";
import RepositoryInfo from "./components/RepositoryInfo";
import theme from "./theme";

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: theme.background.main
    }
});

const Main = () => {
    return (
        <View style={styles.container}>
            <AppBar />
            <Routes>
                <Route path='/' element={<RepositoryList />} />
                <Route path='/:id' element={<RepositoryInfo />} />
                <Route path='/signin' element={<SignIn />} />
                <Route path='*' element={<Navigate to="/" replace />} />
            </Routes>
        </View>
    );
};

export default Main;