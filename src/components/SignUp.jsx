import * as yup from "yup";

import { Formik } from "formik";
import { Pressable, View, StyleSheet } from "react-native";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import theme from "../theme";
import { useNavigate } from "react-router-native";
import useSignUp from "../hooks/useSignUp";
import useSignIn from "../hooks/useSignIn";

const initialValues = {
    username: "",
    password: "",
    passwordConfirm: "",
};

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .min(1, "Username length must be between 1 and 30")
        .max(30, "Username length must be between 1 and 30")
        .required("Username is required"),
    password: yup
        .string()
        .min(5, "Password length must be between 5 and 50")
        .max(50, "Password length must be between 5 and 50")
        .required("Password is required"),
    passwordConfirm: yup
        .string()
        .oneOf([yup.ref("password")], "Password confirmation is not identical to password")
        .required("Password confirmation is required"),
});

const SignUp = () => {
    const navigate = useNavigate();
    const [signUp] = useSignUp();
    const [signIn] = useSignIn();

    const onSubmit = async ({ username, password }) => {
        const data = await signUp({ username, password });
        console.log(data);
        
        await signIn({ username, password });

        navigate("/");
    };

    return (
        <Formik
            initialValues={initialValues} 
            onSubmit={onSubmit}
            validationSchema={validationSchema}>
            {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
        </Formik>
    );
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

const SignUpForm = ({ onSubmit }) => {
    return (
        <View style={styles.container}>
            <FormikTextInput 
                name="username" 
                placeholder="Username" />
            <FormikTextInput 
                name="password" 
                placeholder="Password"
                secureTextEntry />
            <FormikTextInput 
                name="passwordConfirm" 
                placeholder="Password confirmation"
                secureTextEntry />
            <Pressable onPress={onSubmit} style={styles.button}>
                <Text fontWeight="bold" style={{ textAlign: "center", color: "white" }}>Sign up</Text>
            </Pressable>
        </View>
    );
};

export default SignUp;