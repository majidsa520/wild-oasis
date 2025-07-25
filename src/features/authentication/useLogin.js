import { useMutation, useQuery } from "@tanstack/react-query";
import { login } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
export function useLogin() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const {
		mutate: loginUser,
		isLoading: isLoggingin,
		error,
	} = useMutation({
		mutationFn: ({ email, password }) => login({ email, password }),

		onSuccess: (user) => {
			//console.log(user);
			queryClient.setQueryData(["user"], user.user);
			toast.success("Successfully logged in");
			navigate("/dashboard");
		},
		onError: (err) => {
			toast.error("username or password is incorrect");
			//cant realize what actually err is!!
		},
	});
	return { loginUser, isLoggingin };
}
