import { TouchableHighlight } from "react-native";
import Text from "../Text";

const AppBarTab = ({ style, text, onPress }) => {
    return !onPress 
        ? <Text fontWeight='bold' style={{ color: "white" }}>{text}</Text>
        : <TouchableHighlight style={style} onPress={onPress}>
            <Text fontWeight='bold' style={{ color: "white" }}>{text}</Text>
        </TouchableHighlight>;
};

export default AppBarTab;