import getJwt from "helpers/getJwt";
import nprogress from "nprogress";
import { setUser } from "store/reducers/user";

export const submitHandler = async (
	formInputs,
	token,
	router,
	toast,
	dispatch
) => {
	const bodyData = {
		token,
		newPassword: formInputs.password,
	};

	nprogress.start();

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/users/update-password`,
		{
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(bodyData),
		}
	);

	const data = await response.json();
	const sessiontoken = getJwt();

	nprogress.done();

	if (response.ok) {
		//# si el usuario tiene una sesion activa se debe eliminar el token y eliminar la data del usuario de la storage y luego confirmar el cambio de contraseña, si no tiene una sesion activa solo redirigo al login y se indica que fue exitoso el cambio de contraseña

		if (sessiontoken) {
			localStorage.removeItem("musicverse_jwt");
			dispatch(setUser(null));
		}

		toast({
			title: data.message || "Password updated succesfully, please login.",
			status: "success",
			position: "top-right",
			isClosable: true,
		});
		return router.push("/login");
	}

	//# MANEJO DE ERROR. Si el usuario tiene una sesion activa se redirige a la ruta del profile para que solucite de nuevo el cambio de contraseña si no posee una sesion lo se redirige al login, al final se indica el error

	// if (sessiontoken) {
	// 	router.push("/profile");
	// } else {
	// 	router.push("/login");
	// }

	return toast({
		title: data.message || "Error updating password, please try again.",
		status: "error",
		position: "top-right",
		isClosable: true,
	});
};
