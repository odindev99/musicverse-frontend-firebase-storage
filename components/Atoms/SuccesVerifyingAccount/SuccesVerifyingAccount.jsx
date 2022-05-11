import styles from "./SuccesVerifyingAccount.module.scss";
import Link from "next/link";

const SuccesVerifyingAccount = () => {
	return (
		<div className={`${styles.container} `}>
			<h3 className="t3 text-center">Succeeded verifying account</h3>

			<p className="body text-center">
				Your account was verified, please follow the next link to log in:
			</p>

			<div className="all-width xxs-f-main-center">
				<Link href="/login">
					<a className="button">Log in</a>
				</Link>
			</div>
		</div>
	);
};

export default SuccesVerifyingAccount;
