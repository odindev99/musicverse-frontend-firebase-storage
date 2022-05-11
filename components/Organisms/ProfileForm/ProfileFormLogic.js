import { updateUser } from "store/reducers/user";
import nprogress from "nprogress";

export const getBase64 = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
};

export const avatarClickHandler = (inputRef) => {
	inputRef.current.click();
};

export const onChangeInputHandler = async (e, toast, setAvatar) => {
	const selectedFile = e.target?.files[0];
	const type = e.target?.files[0]?.type;
	const rightFileType =
		type === "image/jpeg" || type === "image/png" || type === "image/webp";

	if (selectedFile && !rightFileType) {
		return toast({
			title: "Wrong file type",
			description: " You can only upload png, jpg and webp images",
			status: "error",
			position: "top-right",
			isClosable: true,
		});
	} else if (selectedFile && rightFileType) {
		const base64File = await getBase64(selectedFile);

		return setAvatar(base64File);
	}
};

export const submitHandler = async (e, inputRef, token, toast, dispatch) => {
	e.preventDefault();

	nprogress.start();

	const avatar = inputRef.current.files[0];

	const formData = new FormData();

	formData.append("avatar", avatar);

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/users/upload-user-avatar`,
		{
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${token}`,
			},
			body: formData,
		}
	);

	const data = await response.json();

	nprogress.done();

	if (response.ok) {
		toast({
			title: data.message || "Avatar uploaded successfully.",
			status: "success",
			position: "top-right",
			isClosable: true,
		});

		return dispatch(updateUser({ avatar: data.avatar }));
	}

	return toast({
		title: data.message || "Error uploading avatar, please try again.",
		status: "error",
		position: "top-right",
		isClosable: true,
	});
};

export const requestPasswordChange = async (email) => {
	nprogress.start();

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_URL}/users/send-password-recovery-token`,
		{
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({ email }),
		}
	);

	const data = await response.json();

	nprogress.done();

	if (response.ok) {
		return "success";
	}

	const error = new Error(
		data.message || "An error has ocurred, please try again "
	);

	throw error;
};
