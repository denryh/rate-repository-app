import * as yup from "yup";
import useCreateReview from "../hooks/useCreateReview";

import { Formik } from "formik";
import { Pressable, View, StyleSheet } from "react-native";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import theme from "../theme";
import { useNavigate } from "react-router-native";

const initialValues = {
    repositoryName: "",
    ownerName: "",
    rating: null,
    text: ""
};

const validationSchema = yup.object().shape({
    repositoryName: yup
        .string()
        .required("Repository name is required"),
    ownerName: yup
        .string()
        .required("Repository owner name is required"),
    rating: yup
        .number()
        .typeError("Rating must be a number")
        .min(0, "Rating must be between 0 and 100")
        .max(100, "Rating must be between 0 and 100")
        .required("Rating is required"),
    text: yup
        .string(),
});

const CreateReview = () => {
    const navigate = useNavigate();
    const [createReview] = useCreateReview();

    const handleSubmit = async ({ rating, ...values }) => {
        const data = await createReview({ ...values, rating: parseInt(rating) });
        console.log("created review");
        navigate(`/${data.createReview.repositoryId}`);
    };
    
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
        >
            {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
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

const CreateReviewForm = ({ onSubmit }) => {
    return <View style={styles.container}>
        <FormikTextInput
            name="ownerName"
            placeholder="Repository owner name" />
        <FormikTextInput
            name="repositoryName"
            placeholder="Repository name" />
        <FormikTextInput 
            name="rating"
            placeholder="Rating between 0 and 100" />
        <FormikTextInput 
            name="text"
            placeholder="Review" />
        <Pressable style={styles.button} onPress={onSubmit}>
            <Text fontWeight='bold' style={{ textAlign: "center", color: "white" }}>Create a review</Text>
        </Pressable>
    </View>;
};

export default CreateReview;