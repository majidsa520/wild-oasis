/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
	const { id: editId, ...editValues } = cabinToEdit;
	const isEditingSession = Boolean(editId);
	const { createNewCabin, isCreating } = useCreateCabin();
	const { editCabin, isEditing } = useEditCabin();

	const {
		register,
		handleSubmit,
		getValues,
		formState,
		reset: resetForm,
	} = useForm({
		defaultValues: isEditingSession ? editValues : {},
	});
	const { errors } = formState;
	function onSubmit(data) {
		const image = typeof data.image === "string" ? data.image : data.image[0];
		if (isEditingSession) {
			editCabin(
				{
					newCabinData: { ...data, image: image },
					id: editId,
				},
				{
					onSuccess: (data) => {
						//resetForm({});
						onCloseModal?.();
					},
				}
			);
		} else {
			createNewCabin(
				{ ...data, image: image },
				{
					onSuccess: (data) => {
						resetForm();
						onCloseModal?.();
					},
				}
			);
		}
	}
	function onError(error) {
		//form errors here...
	}
	const isPending = isCreating || isEditing;
	return (
		<Form
			onSubmit={handleSubmit(onSubmit, onError)}
			type={onCloseModal ? "modal" : "regular"}
		>
			<FormRow label="Cabin Name" error={errors?.name?.message}>
				<Input
					id="name"
					type="text"
					{...register("name", { required: "This field is required" })}
					disabled={isPending}
				/>
			</FormRow>
			<FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
				<Input
					id="maxCapacity"
					type="number"
					{...register("maxCapacity", {
						required: "This field is required",
						min: { value: 1, message: "The minimum capacity is 1" },
					})}
					disabled={isPending}
				/>
			</FormRow>
			<FormRow label="Regular price" error={errors?.regularPrice?.message}>
				<Input
					type="number"
					id="regularPrice"
					{...register("regularPrice", {
						required: "This field is required",
						min: { value: 1, message: "minimum price is $1" },
					})}
					disabled={isPending}
				/>
			</FormRow>
			<FormRow label="Discount" error={errors?.discount?.message}>
				<Input
					type="number"
					id="discount"
					{...register("discount", {
						required: "This field is required",
						min: { value: 0, message: "discount cannot be negative!" },
						validate: (value) =>
							Number(value) <= Number(getValues("regularPrice")) ||
							"discount cannot be more than product price",
					})}
					disabled={isPending}
				/>
			</FormRow>
			<FormRow label="Description" error={errors?.descripion?.message}>
				<Textarea
					id="description"
					{...register("description")}
					disabled={isPending}
				/>
			</FormRow>
			<FormRow label="Image" error={errors?.image?.message}>
				<FileInput
					id="image"
					{...register("image", {
						required: isEditingSession
							? false
							: "You must upload an image.",
					})}
					disabled={isPending}
					accept="image/*"
				/>
			</FormRow>
			<FormRow>
				{/* type is an HTML attribute! */}
				<>
					<Button
						$variation="secondary"
						type="reset"
						onClick={() => onCloseModal?.()}
					>
						Cancel
					</Button>
					<Button disabled={isPending}>
						{isEditingSession ? "Edit cabin" : "Add new cabin"}
					</Button>
				</>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
