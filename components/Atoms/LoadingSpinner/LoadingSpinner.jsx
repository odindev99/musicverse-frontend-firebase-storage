import { Spinner } from "@chakra-ui/react";
import scssVars from "styles/_variables.module.scss";

const LoadingSpinner = () => {
	return (
		<Spinner
			thickness="4px"
			speed="0.65s"
			emptyColor="white"
			color={scssVars.vibrantColor}
			size="lg"
		/>
	);
};

export default LoadingSpinner;
