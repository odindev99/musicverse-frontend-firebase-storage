import styles from "./DeleteUserWarning.module.scss";
import { deleteRequest } from "./DeleteUserWarningLogic";

const DeleteUserWarning = ({ email, token, showDeleteUserForm, toast }) => {
	return (
		<section className="all-space xxs-f-center-xy">
			<div
				className={`${styles.container} xxs-f-column xxs-gy-1 c-white text-center`}
			>
				<h3 className="t3">Delete account</h3>

				<p className="body">
					Are you sure you want to delete your account? You will lose all your
					information.
				</p>

				<div className="xxs-f-main-center">
					<button
						className="button"
						onClick={() =>
							deleteRequest(email, token, showDeleteUserForm, toast)
						}
					>
						Yes, delete account
					</button>
				</div>
			</div>
		</section>
	);
};

export default DeleteUserWarning;
