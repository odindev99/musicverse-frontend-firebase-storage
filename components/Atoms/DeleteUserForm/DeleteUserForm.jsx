import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "./DeleteUserForm.module.scss";
import { submitHandler } from "./DeleteUserFormLogic";

const DeleteUserForm = ({ email, token, dispatch, router, toast }) => {
	const formik = useFormik({
		initialValues: {
			confirmationToken: "",
		},
		validationSchema: Yup.object({
			confirmationToken: Yup.string()
				.trim()
				.required("Required"),
		}),
		onSubmit: (values) =>
			submitHandler(values, email, token, router, toast, dispatch),
	});

	return (
		<section className="all-space xxs-f-center-xy">
			<form
				className={`form ${styles.custom_form}`}
				onSubmit={formik.handleSubmit}
			>
				<h3 className="t3 c-white text-center">Delete account</h3>

				<p className="body c-white text-center xxs-mt-15">
					A token had been sent to your email, please copy that token to proceed
					to delete your account.
				</p>

				<label className="body" htmlFor="confirmationToken">
					Token:
				</label>
				<input
					type="text"
					id="confirmationToken"
					name="confirmationToken"
					{...formik.getFieldProps("confirmationToken")}
				/>
				{formik.touched.confirmationToken && formik.errors.confirmationToken ? (
					<div className="formik-error">{formik.errors.confirmationToken}</div>
				) : null}

				<div className="xxs-f-main-center">
					<button className="button">Delete account</button>
				</div>
			</form>
		</section>
	);
};

export default DeleteUserForm;
