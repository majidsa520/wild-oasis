import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";

function Account() {
	return (
		<>
			<Row type="vertical">
				<Heading as="h3">Update your account</Heading>
				<UpdateUserDataForm />
			</Row>
			<Row type="vertical">
				<Heading as="h3">Update password</Heading>
				<UpdatePasswordForm />
			</Row>
		</>
	);
}

export default Account;
