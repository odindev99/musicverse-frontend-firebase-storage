import { useToast } from "@chakra-ui/react";
import { changeHandler, submitHandler } from "./EmailFormPasswordRecoveryLogic";
import { useFormik } from "formik";
import * as Yup from "yup";

const EmailFormPasswordRecovery = ({ setUserEmail }) => {
	const toast = useToast();
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
		onSubmit: (values) => submitHandler(values, toast, setUserEmail),
	});

	return (
		<form className={`form`} onSubmit={formik.handleSubmit}>
			<h3 className="t3 c-white xxs-mb-30 text-center">
				Enter your email address and we will send you an email so you can
				recover your password
			</h3>

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

			<button type="submit" className="button">
				Recover password
			</button>
		</form>
	);
};

export default EmailFormPasswordRecovery;
