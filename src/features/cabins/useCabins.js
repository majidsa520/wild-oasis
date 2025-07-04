import { useQuery } from "@tanstack/react-query";
import { getCabins as getCabinsApi } from "../../services/apiCabins";

export function useCabins() {
	const {
		data: cabins,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["cabins"],
		queryFn: getCabinsApi,
	});
	return { cabins, isLoading, error };
}
