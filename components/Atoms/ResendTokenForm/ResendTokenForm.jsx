import { useToast } from "@chakra-ui/react";
import { submitHandler } from "./ResendTokenFormLogic";
import { useFormik } from "formik";
import * as Yup from "yup";

const ResendTokenForm = ({ setUserEmail }) => {
	const toast = useToast();

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: Yup.object({
			email: Yup.string()
				.trim()
				.email("You must provide a valid email.")
				.required("Required"),
			password: Yup.string()
				.trim()
				.min(6, "The password must have at least a length of 6 characters.")
				.max(16, "The password allows a maximum length of 16 characters.")
				.required("Required"),
		}),
		onSubmit: (values) => submitHandler(values, toast, setUserEmail),
	});

	return (
		<form className={`form`} onSubmit={formik.handleSubmit}>
			<label htmlFor="email" className="body c-white">
				Email:
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

			<label htmlFor="password" className="body c-white">
				Password:
			</label>
			<input
				type="password"
				name="password"
				{...formik.getFieldProps("password")}
			/>
			{formik.touched.password && formik.errors.password ? (
				<div className="formik-error">{formik.errors.password}</div>
			) : null}

			<button type="submit" className="button">
				Resend token
			</button>
		</form>
	);
};

export default ResendTokenForm;
