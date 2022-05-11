import { useState } from "react";
import ResendTokenForm from "components/Atoms/ResendTokenForm/ResendTokenForm";
import SucceededSignin from "components/Atoms/SucceededNotification/SucceededNotification";

const ResendToken = () => {
	const [userEmail, setUserEmail] = useState();

	return (
		<section className="max-width all-height xxs-f-column xxs-f-center-xy">
			{!userEmail ? (
				<>
					<h3 className="t3 c-white xxs-mb-40">Resend verification token</h3>
					<ResendTokenForm setUserEmail={setUserEmail} />
				</>
			) : (
				<SucceededSignin userEmail={userEmail} />
			)}
		</section>
	);
};

export default ResendToken;
