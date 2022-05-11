import { Spinner } from "@chakra-ui/react";
import scssVars from "styles/_variables.module.scss";

const ProfileLoadingSpinner = () => {
	return (
		<Spinner
			thickness="2.5px"
			speed="0.65s"
			emptyColor="white"
			color={scssVars.vibrantColor}
			size="sm"
		/>
	);
};

export default ProfileLoadingSpinner;
