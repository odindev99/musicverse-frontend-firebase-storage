import { Avatar } from "@chakra-ui/react";

const ProfileButton = ({ clickHandler, user }) => {
	return (
		<button onClick={clickHandler}>
			<Avatar
				size="sm"
				bg="#7a7a7a"
				src={user?.avatar && user.avatar.url}
			/>
		</button>
	);
};

export default ProfileButton;
