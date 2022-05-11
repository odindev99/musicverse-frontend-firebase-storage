import ChangedEmailNotification from "components/Atoms/ChangedEmailNotification/ChangedEmailNotification";
import useConfirmEmailChange from "hooks/useConfirmEmailChange";

const EmailChange = () => {
	const {confirmed, email} = useConfirmEmailChange();

	return (
		<>
			{confirmed === undefined && <div>Loading</div>}

			{confirmed && <ChangedEmailNotification email={email} />}
		</>
	);
};

export default EmailChange;
