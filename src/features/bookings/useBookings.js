import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";

export function useBookings() {
	const [searchParams] = useSearchParams();
	const filterBy = searchParams.get("status") || "all";
	const filter = { field: "status", filterBy };
	const sortBy = (searchParams.get("sortBy") || "startDate-asc").split("-");
	const sort = { sortField: sortBy.at(0), sortDirection: sortBy.at(1) };
	const {
		data: bookings,
		error,
		isLoading,
	} = useQuery({
		queryKey: ["bookings", filter, sort],
		queryFn: () => getBookings({ filter, sort }),
	});
	return { bookings, error, isLoading };
}
