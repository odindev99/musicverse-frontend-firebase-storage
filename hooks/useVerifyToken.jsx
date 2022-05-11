import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "store/reducers/user";

const verifyToken = async (token, dispatch, setVerifiedToken) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/users/verify-token`,
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		}
	);

	const data = await response.json();

	// el token envido es valido por lo que se guarda la informacion del usuario
	if (response.ok) {
		dispatch(setUser(data.user));
		return setVerifiedToken(true);
	}

	// el token enviado es invalido, por consecuencia se remueve el token
	localStorage.removeItem("musicverse_jwt");
	return setVerifiedToken(true);
};

const useVerifyToken = () => {
	const dispatch = useDispatch();

	const [verifiedToken, setVerifiedToken] = useState(false);

	useEffect(() => {
		const jwt = localStorage.getItem("musicverse_jwt");
		
		if (jwt) {
			return verifyToken(jwt, dispatch, setVerifiedToken);
		}

		return setVerifiedToken(true);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return verifiedToken;
};

export default useVerifyToken;
