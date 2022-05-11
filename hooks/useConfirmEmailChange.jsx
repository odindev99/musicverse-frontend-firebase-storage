import { useToast } from "@chakra-ui/react";
import getJwt from "helpers/getJwt";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "store/reducers/user";

const confirmEmail = async (
	token,
	dispatch,
	email,
	toast,
	router,
	setConfirmed
) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/users/confirm-new-email/${token}`,
		{
			method: "PATCH",
		}
	);

	const data = await response.json();
	const sessiontoken = getJwt();

	if (response.ok) {
		//# si el usuario tiene una sesion activa se debe eliminar el token y eliminar la data del usuario de la storage y luego confirmar el cambio de email, si no tiene una sesion activa solo redirigo al login
		if (sessiontoken) {
			localStorage.removeItem("musicverse_jwt");
			dispatch(setUser(null));
		}

		email.current = data.newEmail;
		return setConfirmed(true);
	}
	//# MANEJO DE ERROR. Si el usuario tiene una sesion activa se redirige a la ruta del profile para que solucite de nuevo el cambio de correo si no posee una sesion lo llevo al login

	toast({
		title: data.message || "Error confirming email, please try again!",
		position: "top-right",
		isClosable: true,
		status: "error",
		id: "verify-account",
	});

	if (sessiontoken) {
		return router.push("/profile");
	}

	return router.push("/auth/login");
};

const useConfirmEmailChange = () => {
	const [confirmed, setConfirmed] = useState();
	const email = useRef();
	const router = useRouter();
	const { token } = router.query;
	const toast = useToast();
	const dispatch = useDispatch();

	useEffect(() => {
		confirmEmail(token, dispatch, email, toast, router, setConfirmed);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token]);

	return { confirmed, email: email.current };
};

export default useConfirmEmailChange;
