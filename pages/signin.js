import SucceededSignin from "components/Atoms/SucceededNotification/SucceededNotification";
import { useState } from "react";
import SigninForm from "components/Atoms/SigninForm/SigninForm";

const Auth = () => {
	const [userEmail, setUserEmail] = useState();

	return (
		<section className="max-width all-height xxs-f-column xxs-f-center-xy">
			{!userEmail ? (
				<SigninForm setUserEmail={setUserEmail} />
			) : (
				<SucceededSignin userEmail={userEmail} />
			)}
		</section>
	);
};

export default Auth;
