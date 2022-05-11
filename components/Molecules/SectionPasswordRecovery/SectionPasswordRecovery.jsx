import { useState } from "react";
import EmailFormPasswordRecovery from "components/Atoms/EmailFormPasswordRecovery/EmailFormPasswordRecovery";
import SucceededNotification from "components/Atoms/SucceededNotification/SucceededNotification";

const SectionPasswordRecovery = ({ withoutMaxWidth = false }) => {
	const [userEmail, setUserEmail] = useState();

	return (
		<section
			className={`${
				!withoutMaxWidth ? "max-width" : "all-width"
			} all-height xxs-f-column xxs-f-center-xy`}
		>
			{!userEmail ? (
				<EmailFormPasswordRecovery setUserEmail={setUserEmail} />
			) : (
				<SucceededNotification userEmail={userEmail} sectionPassword />
			)}
		</section>
	);
};

export default SectionPasswordRecovery;
