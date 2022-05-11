import { useFormik } from "formik";
import * as Yup from "yup";
import formChangeHandler from "helpers/formChangeHandler";
import { useRef } from "react";
import { submitHandler } from "./ChangeUsernameFormLogic";

const ChangeUsernameForm = ({ token, closeModal, dispatch, toast }) => {
	const formik = useFormik({
		initialValues: {
			username: "",
		},
		validationSchema: Yup.object({
			username: Yup.string()
				.trim()
				.min(6, "Username must have at least a length of 6 characters.")
				.max(20, "Username allows a maximum length of 20 characters.")
				.required("Required"),
		}),
		onSubmit: (values) =>
			submitHandler(values, token, dispatch, closeModal, toast),
	});

	return (
		<section
			className="all-space xxs-f-center-xy"
			onSubmit={formik.handleSubmit}
		>
			<form className="form">
				<h3 className="t3 c-white text-center">Username Change</h3>

				<label htmlFor="username" className="body c-white">
					New username:
				</label>
				<input
					type="text"
					id="username"
					name="username"
					{...formik.getFieldProps("username")}
				/>
				{formik.touched.username && formik.errors.username ? (
					<div className="formik-error">{formik.errors.username}</div>
				) : null}

				<button className="button" type="submit">
					Confirm
				</button>
			</form>
		</section>
	);
};

export default ChangeUsernameForm;
