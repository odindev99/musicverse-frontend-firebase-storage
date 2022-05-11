import styles from "./LoginForm.module.scss";
import { submitHandler } from "./LoginFormLogic";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setUser } from "../../../store/reducers/user";
import { useToast } from "@chakra-ui/react";
import Link from "next/link";
import { useFormik } from "formik";
import { yupValidationsSchema } from "./validations";

const LoginForm = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const toast = useToast();
	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: yupValidationsSchema,
		onSubmit: (values) =>
			submitHandler(values, dispatch, setUser, router, toast),
	});

	return (
		<form className={`form`} onSubmit={formik.handleSubmit}>
			<h3 className="t3 c-white text-center">Log in to Musicverse</h3>

			<label htmlFor="email" className="body c-white">
				Email:
			</label>
			<input
				type="email"
				name="email"
				id="email"
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
				id="password"
				{...formik.getFieldProps("password")}
			/>
			{formik.touched.password && formik.errors.password ? (
				<div className="formik-error">{formik.errors.password}</div>
			) : null}

			<div className="xxs-mt-25 all-width m-f-main-center wrap">
				<div className={styles.grid_container}>
					<p className="body c-white xxs-mr-10">Do you forgot your password?</p>
					<Link href="/auth/password-recovery">
						<a>Retrieve it here</a>
					</Link>
					<p className="body c-white xxs-mr-10">
						Do you need a new verification token?
					</p>
					<Link href="/auth/verify-account/resend-token">
						<a>Get it here</a>
					</Link>
				</div>
			</div>

			<button type="submit" className="button">
				Log in
			</button>
		</form>
	);
};

export default LoginForm;
