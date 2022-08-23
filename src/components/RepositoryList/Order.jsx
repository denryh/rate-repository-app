import { StyleSheet, TextInput } from "react-native";
import Picker from "react-native-picker-select";

const styles = StyleSheet.create({
    searchBar: {
        margin: 15,
        padding: 10,
        backgroundColor: "white"
    },
    inputIOSContainer: {
        paddingBottom: 15,
        paddingHorizontal: 15,    
    }
});

const Order = ({ setOrder, searchKeyword, setSearchKeyword }) => {
    return (
        <>
            <TextInput 
                placeholder="Search"
                style={styles.searchBar}
                onChangeText={setSearchKeyword}
                value={searchKeyword} 
            />
            <Picker
                onValueChange={(value) => setOrder(value)}
                items={[
                    { label: "Latest repositories", value: { orderBy: "CREATED_AT", orderDirection: "DESC"} },
                    { label: "Highest rated repositories", value: { orderBy: "RATING_AVERAGE", orderDirection: "DESC" }},
                    { label: "Lowest rated repositories", value: { orderBy: "RATING_AVERAGE", orderDirection: "ASC" } },
                ]}
                style={{ inputIOSContainer: styles.inputIOSContainer }}
                placeholder={{}}
            />
        </>
    ); 
};

export default Order;