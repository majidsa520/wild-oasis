import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
	const { mutate: signup, isLoading: isSigningup } = useMutation({
		mutationFn: signupApi,
		onSuccess: (user) => {
			// user is user data returned from database
			toast.success(
				"User has been successfully signed up. Please check your email for a verification link.",
				{ duration: 7000 }
			);
		},
		onError: (error) => toast.error(error.message),
	});
	return { signup, isSigningup };
}
