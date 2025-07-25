import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
	const queryClient = useQueryClient();

	const { mutate: discardBooking, isLoading: isDeletingBooking } = useMutation(
		{
			mutationFn: deleteBooking,
			onSuccess: (data) => {
				toast.success(`booking #${data.id} was successfully deleted`);
				queryClient.invalidateQueries(["bookings"]);
			},
		}
	);
	return { discardBooking, isDeletingBooking };
}
