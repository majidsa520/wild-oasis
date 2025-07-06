import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSettings() {
	const queryClient = useQueryClient();
	const {
		mutate: updateSetting,
		isLoading: isUpdating,
		updateError,
	} = useMutation({
		mutationFn: updateSettingApi,
		onSuccess: () => {
			toast.success("settings have successfully updated.");
			queryClient.invalidateQueries(["settings"]);
		},
	});
	return { updateSetting, isUpdating, updateError };
}
