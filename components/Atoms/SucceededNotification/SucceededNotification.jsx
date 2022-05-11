import styles from "./SucceededNotification.module.scss";

const SucceededNotification = ({
	userEmail,
	sectionPassword,
	sectionChangeEmail,
}) => {
	return (
		<div className={`${styles.container}`}>
			<p className="body text-center">A confirmation email has been sent to:</p>
			<h5 className="t5 text-center">{userEmail}</h5>
			<p className="body text-center">
				{`Please follow the instructions to ${
					sectionPassword
						? "change your Musicverse password"
						: sectionChangeEmail
						? "change your Musicverse email"
						: "activate your Musicverse account"
				}. `}
			</p>
			<p className="body text-center">Thank you!</p>
		</div>
	);
};

export default SucceededNotification;
