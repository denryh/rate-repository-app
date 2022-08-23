import { StyleSheet } from "react-native";
import Picker from "react-native-picker-select";

const styles = StyleSheet.create({
    container: {
        paddingVertical: 25,
        paddingHorizontal: 15,    
    }
});

const Order = ({ setOrder }) => {
    return (
        <Picker
            onValueChange={(value) => setOrder(value)}
            items={[
                { label: "Latest repositories", value: { orderBy: "CREATED_AT", orderDirection: "DESC"} },
                { label: "Highest rated repositories", value: { orderBy: "RATING_AVERAGE", orderDirection: "DESC" }},
                { label: "Lowest rated repositories", value: { orderBy: "RATING_AVERAGE", orderDirection: "ASC" } },
            ]}
            style={{
                inputIOSContainer: styles.container,
            }}
            placeholder={{}}
        />
    ); 
};

export default Order;