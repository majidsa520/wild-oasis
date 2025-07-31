import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

export function useCheckin() {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const {
		mutate: checkin,
		error,
		isLoading: isCheckingin,
	} = useMutation({
		mutationFn: ({ bookingId, breakfast }) =>
			updateBooking(bookingId, {
				status: "checked-in",
				isPaid: true,
				...breakfast,
			}), // this way we can pass the bookingId in mutation function(checkin(id))
		onSuccess: (data) => {
			//the data argument here is the returned value from updateBooking function
			toast.success(`The booking #${data.id} has successfully checked in`);
			queryClient.invalidateQueries(["stays"]);
			queryClient.invalidateQueries(["todayActivity"]);
			queryClient.invalidateQueries(["stays"]);
			queryClient.invalidateQueries(["bookings"]);
			navigate(-1);
		},
	});
	return { checkin, error, isCheckingin };
}
