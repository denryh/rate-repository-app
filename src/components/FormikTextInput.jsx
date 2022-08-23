import { StyleSheet } from "react-native";
import { useField } from "formik";

import TextInput from "./TextInput";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
    normal: {
        marginTop: 10,
        padding: 15,
        borderColor: theme.colors.textSecondary,
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 3,
    },
    errorText: {
        marginTop: 5,
        color: theme.colors.error,
    },
});

const FormikTextInput = ({ name, style, ...props }) => {
    const [field, meta, helpers] = useField(name);
    const showError = meta.touched && meta.error;

    return (
        <>
            <TextInput
                onChangeText={value => helpers.setValue(value)}
                onBlur={() => helpers.setTouched(true)}
                value={field.value}
                error={showError}
                style={[styles.normal, style]}
                {...props}
            />
            {showError && <Text style={styles.errorText}>{meta.error}</Text>}
        </>
    );
};

export default FormikTextInput;