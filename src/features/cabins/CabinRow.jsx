/* eslint-disable react/prop-types */
import styled from "styled-components";
import Button from "../../ui/Button";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";

const TableRow = styled.tr`
	display: grid;
	grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
	column-gap: 2.4rem;
	align-items: center;
	padding: 1.4rem 2.4rem;

	&:not(:last-child) {
		border-bottom: 1px solid var(--color-grey-100);
	}
`;

const Img = styled.img`
	display: block;
	width: 6.4rem;
	aspect-ratio: 3 / 2;
	object-fit: cover;
	object-position: center;
	transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.td`
	font-size: 1.6rem;
	font-weight: 600;
	color: var(--color-grey-600);
	font-family: "Sono";
	text-align: center;
`;

const Price = styled.td`
	font-family: "Sono";
	font-weight: 600;
	text-align: center;
`;
const Capacity = styled.td`
	font-family: "Sono";
	font-weight: 600;
	text-align: center;
`;

const Discount = styled.td`
	font-family: "Sono";
	font-weight: 500;
	color: var(--color-green-700);
	text-align: center;
`;

function CabinRow({ cabin }) {
	const [showForm, setShowForm] = useState();
	const {
		name,
		discount,
		regularPrice,
		image,
		maxCapacity,
		id: cabinId,
	} = cabin;
	const { isDeleting, removeCabin } = useDeleteCabin();
	return (
		<>
			<TableRow>
				<td>
					<Img src={image} />
				</td>
				<Cabin>{name}</Cabin>
				<Capacity>{maxCapacity}</Capacity>
				<Price>{regularPrice}</Price>
				<Discount>{discount ? discount : "-"}</Discount>
				<td>
					<Button
						variation="secondary"
						size="small"
						onClick={() => setShowForm(() => !showForm)}
					>
						edit
					</Button>
					<Button
						variation="secondary"
						size="small"
						onClick={() => removeCabin(cabinId)}
						disabled={isDeleting}
					>
						delete
					</Button>
				</td>
			</TableRow>
			{showForm && (
				<tr>
					<td>
						<CreateCabinForm cabinToEdit={cabin} />
					</td>
				</tr>
			)}
		</>
	);
}

export default CabinRow;
