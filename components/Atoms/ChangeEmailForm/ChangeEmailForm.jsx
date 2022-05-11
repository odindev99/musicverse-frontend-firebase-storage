import { useFormik } from "formik";
import { useState } from "react";
import SucceededNotification from "../SucceededNotification/SucceededNotification";
import submitHandler from "./ChangeEmailFormLogic";
import * as Yup from "yup";

const ChangeEmailForm = ({ token, toast }) => {
	const [newEmail, setNewEmail] = useState();
	const formik = useFormik({
		initialValues: {
			email: "",
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.trim()
				.email("You must provide a valid email.")
				.required("Required"),
		}),
		onSubmit: (values) => submitHandler(values, token, setNewEmail, toast),
	});

	return (
		<section className="all-space xxs-f-center-xy">
			{!newEmail ? (
				<form className="form" onSubmit={formik.handleSubmit}>
					<h3 className="t3 c-white text-center">Email change</h3>

					<label htmlFor="newEmail" className="body c-white">
						New email:
					</label>
					<input
						type="email"
						id="email"
						name="email"
						{...formik.getFieldProps("email")}
					/>
					{formik.touched.email && formik.errors.email ? (
						<div className="formik-error">{formik.errors.email}</div>
					) : null}

					<button className="button" type="submit">
						Confirm email
					</button>
				</form>
			) : (
				<SucceededNotification sectionChangeEmail userEmail={newEmail} />
			)}
		</section>
	);
};

export default ChangeEmailForm;
