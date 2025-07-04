import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin as createCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";
export function useCreateCabin() {
	const queryClient = useQueryClient();
	const { mutate: createNewCabin, isLoading: isCreating } = useMutation({
		mutationFn: createCabinApi,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cabins"] });
			toast.success("New cabin has successfully added");
		},
		onError: () => {
			toast.error("Something went wrong");
		},
	});
	return { isCreating, createNewCabin };
}
