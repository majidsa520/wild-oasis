import { useEffect, useState } from "react";

import Heading from "../ui/Heading";
import Row from "../ui/Row";

import CabinTable from "../features/cabins/CabinTable";
import CabinRow from "../features/cabins/CabinRow";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import Button from "../ui/Button";

function Cabins() {
	useEffect(() => {
		//const cabins = await getCabins()
		//console.log(cabins);
	}, []);
	const [showForm, setShowForm] = useState(false);

	return (
		<>
			<Row type="horizontal">
				<Heading as="h1">All cabins</Heading>
				<p>Filter / Sort</p>
			</Row>
			<Row type="vertical">
				<CabinTable />
				<Button onClick={() => setShowForm(!showForm)}>Add a new cabin</Button>
			</Row>
			{showForm && (
				<Row>
					<CreateCabinForm />
				</Row>
			)}
		</>
	);
}

export default Cabins;
