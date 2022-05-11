import { useToast } from "@chakra-ui/react";
import { submitHandler } from "./SigninFormLogic";
import { useFormik } from "formik";
import { yupValidationsSchema, ownValidations } from "./validations";

const SinginForm = ({ setUserEmail }) => {
	const toast = useToast();
	const formik = useFormik({
		initialValues: {
			username: "",
			email: "",
			password: "",
			confirm_password: "",
		},
		validationSchema: yupValidationsSchema,
		validate: ownValidations,
		onSubmit: (values) => submitHandler(values, toast, setUserEmail),
	});

	return (
		<form className={`form`} onSubmit={formik.handleSubmit}>
			<h3 className="t3 c-white text-center">Sign in to Musicverse</h3>

			<label htmlFor="username" className="body c-white">
				Username:
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
				Sign in
			</button>
		</form>
	);
};

export default SinginForm;
