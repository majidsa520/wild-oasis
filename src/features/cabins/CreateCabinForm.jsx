import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
	const queryClient = useQueryClient();

	const { mutate: createNewCabin, isLoading: isCreating } = useMutation({
		mutationFn: createCabin,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["cabins"] });
			toast.success("New cabin has successfully added");
			//reset();
		},
		onError: () => {
			toast.error("Something went wrong");
		},
	});

	const { register, handleSubmit, getValues, formState, reset } = useForm();
	const { errors } = formState;
	function onSubmit(data) {
		createNewCabin(data);
	}
	function onError(error) {
		//form errors here...
	}
	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)}>
			<FormRow label="Cabin Name" error={errors?.name?.message}>
				<Input
					id="name"
					type="text"
					{...register("name", { required: "This field is required" })}
					disabled={isCreating}
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
					disabled={isCreating}
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
					disabled={isCreating}
				/>
			</FormRow>
			<FormRow label="Discount" error={errors?.discount?.message}>
				<Input
					type="number"
					id="discoutn"
					{...register("discount", {
						required: "This field is required",
						min: { value: 0, message: "discount cannot be negative!" },
						validate: (value) =>
							value <= getValues("regularPrice") ||
							"discount cannot be more than product price",
					})}
					disabled={isCreating}
				/>
			</FormRow>
			<FormRow label="Description" error={errors?.descripion?.message}>
				<Textarea
					id="description"
					{...register("description")}
					disabled={isCreating}
				/>
			</FormRow>
			<FormRow>
				{/* type is an HTML attribute! */}
				<>
					<Button variation="secondary" type="reset">
						Cancel
					</Button>
					<Button disabled={isCreating}>Add cabin</Button>
				</>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
