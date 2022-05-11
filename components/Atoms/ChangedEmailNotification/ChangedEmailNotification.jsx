import styles from "./ChangedEmailNotification.module.scss";
import Link from "next/link";

const ChangedEmailNotification = ({ email }) => {
	return (
		<section className=" all-space xxs-f-center-xy ">
			<div className={`${styles.container} xxs-f-column xxs-gy-1`}>
				<p className="body text-center">Your email has been changed to:</p>
				<h5 className="t5 text-center">{email}</h5>
				<p className="body text-center">Please login with your new email </p>

				<div className="xxs-f-main-center">
					<Link href="/login">
						<a className="button">Login</a>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default ChangedEmailNotification;
