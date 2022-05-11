import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import { submitHandler } from "./NewPasswodFormLogic";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

const NewPasswodForm = ({ token }) => {
	const router = useRouter();
	const toast = useToast();
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			password: "",
			confirm_password: "",
		},
		validationSchema: Yup.object({
			password: Yup.string()
				.trim()
				.min(6, "The password must have at least a length of 6 characters.")
				.max(16, "The password allows a maximum length of 20 characters.")
				.required("Required"),
		}),
		validate: (values) => {
			const errors = {};

			if (values.password !== values.confirm_password) {
				errors.confirm_password =
					"Password and confirmed password aren't equals.";
			}

			return errors;
		},
		onSubmit: (values) => submitHandler(values, token, router, toast, dispatch),
	});

	return (
		<form className="form" onSubmit={formik.handleSubmit}>
			<h3 className="t3 text-center">Password change</h3>

			<label htmlFor="password" className="body c-white">
				Password:
			</label>
			<input
				type="password"
				id="password"
				name="password"
				{...formik.getFieldProps("password")}
			/>
			{formik.touched.password && formik.errors.password ? (
				<div className="formik-error">{formik.errors.password}</div>
			) : null}

			<label htmlFor="confirm_password" className="body c-white">
				Confirm Password:
			</label>
			<input
				type="password"
				id="confirm_password"
				name="confirm_password"
				{...formik.getFieldProps("confirm_password")}
			/>
			{formik.touched.confirm_password && formik.errors.confirm_password ? (
				<div className="formik-error">{formik.errors.confirm_password}</div>
			) : null}

			<button className="button" type="submit">
				Confirm change
			</button>
		</form>
	);
};

export default NewPasswodForm;
