import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSetttings";
import { useEffect } from "react";
import { useUpdateSettings } from "./useUpdateSettings";

function UpdateSettingsForm() {
	const { settings, isLoading, error } = useSettings();
	const { register, getValues, formState, handleSubmit, reset } = useForm({
		defaultValues: settings,
	});
	const { updateSetting, isUpdating, updateError } = useUpdateSettings();
	useEffect(() => {
		if (settings) reset(settings);
	}, [reset, settings]);

	function handleUpdate(e, field) {
		const value = Number(e.target.value);
		if (value > 0 && value !== settings[field])
			updateSetting({ [field]: value });
	}
	if (isLoading) return <Spinner />;
	return (
		<Form>
			<FormRow label="Minimum nights/booking">
				<Input
					type="number"
					id="min-nights"
					name="minBookingLength"
					{...register("minBookingLength", {
						required: true,
						validate: (value) =>
							Number(value) > 0 || "The value must be positive",
					})}
					onBlur={(e) => handleUpdate(e, "minBookingLength")}
					disabled={isUpdating}
				/>
			</FormRow>
			<FormRow label="Maximum nights/booking">
				<Input
					type="number"
					id="max-nights"
					{...register("maxBookingLength", {
						required: true,
						validate: (value) => value > 0 || "must be positive",
					})}
					onBlur={(e) => handleUpdate(e, "maxBookingLength")}
					disabled={isUpdating}
				/>
			</FormRow>
			<FormRow label="Maximum guests/booking">
				<Input
					type="number"
					id="max-guests"
					{...register("maxGuestsPerBooking", {
						required: true,
						validate: (value) => value > 0 || "must be positive",
					})}
					onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
					disabled={isUpdating}
				/>
			</FormRow>
			<FormRow label="Breakfast price">
				<Input
					type="number"
					id="breakfast-price"
					{...register("breakfastPrice", {
						required: true,
						validate: (value) => value > 0 || "must be positive",
					})}
					onBlur={(e) => handleUpdate(e, "breakfastPrice")}
					disabled={isUpdating}
				/>
			</FormRow>
		</Form>
	);
}

export default UpdateSettingsForm;
