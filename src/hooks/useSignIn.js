import { useMutation, useApolloClient } from "@apollo/client";
import useAuthStorage from "./useAuthStorage";
import { SIGN_IN } from "../graphql/mutations";

const useSignIn = () => {
    const [mutate, result] = useMutation(SIGN_IN);
    const apolloClient = useApolloClient();
    const authStorage = useAuthStorage();

    const signIn = async (values) => {
        const { data } = await mutate({ variables: {
            credentials: {
                ...values
            }
        }});

        await authStorage.setAccessToken(data.authenticate.accessToken);

        apolloClient.resetStore();

        return data;
    };

    return [signIn, result];
};

export default useSignIn;