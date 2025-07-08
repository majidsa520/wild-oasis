import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
	return (
		<Modal>
			<Modal.Open opens="cabin-form">
				<Button className="test">Add a New Cabin</Button>
			</Modal.Open>
			<Modal.Window name="cabin-form">
				<CreateCabinForm />
			</Modal.Window>
		</Modal>
	);
}

export default AddCabin;
