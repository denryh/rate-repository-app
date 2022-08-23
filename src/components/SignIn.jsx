import { Pressable, StyleSheet, View } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";

import { useNavigate } from "react-router-native";
import useSignIn from "../hooks/useSignIn";

import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import theme from "../theme";

const initialValues = {
    username: "",
    password: "",
};

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .min(3, "Username must have a min length of 3")
        .required("Username is required"),
    password: yup
        .string()
        .min(6, "Password must have a min length of 6")
        .required("Password is required")
});

export const SignInContainer = ({ onSubmit }) => {
    return <Formik 
        initialValues={initialValues} 
        onSubmit={onSubmit} 
        validationSchema={validationSchema}
    >
        {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>;
};

const SignIn = () => {
    const navigate = useNavigate();
    const [signIn] = useSignIn();

    const onSubmit = async (values) => {
        try {
            const data = await signIn(values);
            navigate("/");
            console.log(data);
        } catch (e) {
            console.log(e);
        }
    };

    return <SignInContainer onSubmit={onSubmit} />;
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        paddingBottom: 10,
        backgroundColor: "white",
        alignItems: "stretch"
    },
    button: {
        marginTop: 10,
        backgroundColor: theme.colors.primary,
        borderRadius: 3,
        padding: 15,
    }
});

const SignInForm = ({ onSubmit }) => {
    return <View style={styles.container}>
        <FormikTextInput 
            name="username" 
            placeholder="Username" 
            placeholderTextColor={theme.colors.textSecondary} 
        />
        <FormikTextInput 
            name="password" 
            placeholder="Password" 
            placeholderTextColor={theme.colors.textSecondary} 
            secureTextEntry 
        />
        <Pressable style={styles.button} onPress={onSubmit}>
            <Text fontWeight='bold' style={{ textAlign: "center", color: "white" }}>Sign in</Text>
        </Pressable>
    </View>;
};

export default SignIn;