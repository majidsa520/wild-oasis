import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
	const [searchParams] = useSearchParams();
	const filterBy = searchParams.get("status") || "all";
	console.log(filterBy);
	const {
		data: bookings,
		error,
		isLoading,
	} = useQuery({
		queryKey: ["bookings", filterBy],
		queryFn: () => getBookings({ filter: { field: "status", filterBy } }),
	});
	return { bookings, error, isLoading };
}
