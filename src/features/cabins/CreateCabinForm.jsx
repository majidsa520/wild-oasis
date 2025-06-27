/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { createCabin } from "../../services/apiCabins";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({ cabinToEdit = {} }) {
	const queryClient = useQueryClient();
	const { id: editId, ...editValues } = cabinToEdit;
	const isEditingSession = Boolean(editId);

	const { mutate: createNewCabin, isLoading: isCreating } = useMutation({
		mutationFn: createCabin,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cabins"] });
			toast.success("New cabin has successfully added");
			reset();
		},
		onError: () => {
			toast.error("Something went wrong");
		},
	});
	const { mutate: editCabin, isLoading: isEditing } = useMutation({
		mutationFn: ({ newCabinData, id }) => {
			createCabin(newCabinData, id);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cabins"] });
			toast.success("The cabin was successfully edited.");
			reset();
		},
		onError: () => {
			toast.error("Something went wrong");
		},
	});

	const { register, handleSubmit, getValues, formState, reset } = useForm({
		defaultValues: isEditingSession ? editValues : {},
	});
	const { errors } = formState;
	function onSubmit(data) {
		const image = typeof data.image === "string" ? data.image : data.image[0];
		if (isEditingSession) {
			editCabin({
				newCabinData: { ...data, image: image },
				id: editId,
			});
			reset();
		} else {
			createNewCabin({ ...data, image: image });
			reset();
		}
	}
	function onError(error) {
		//form errors here...
	}
	const isPending = isCreating || isEditing;
	console.log(getValues());
	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)}>
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
							value <= getValues().regularPrice ||
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
						required: isEditingSession ? false : "You must upload an image.",
					})}
					disabled={isPending}
					accept="image/*"
				/>
			</FormRow>
			<FormRow>
				{/* type is an HTML attribute! */}
				<>
					<Button variation="secondary" type="reset">
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
