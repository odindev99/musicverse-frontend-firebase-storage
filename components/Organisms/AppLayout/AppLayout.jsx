import Navbar from "/components/Organisms/Navbar/Navbar";
import styles from "./AppLayout.module.scss";
// import useVerifyToken from "../../../hooks/useVerifyToken";
import Menu from "../../Molecules/Menu/Menu";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "helpers/chakraUiCustomStyles";

const AppLayout = ({ children }) => {
	// useVerifyToken();
	const [showMenu, setShowMenu] = useState(false);

	const toggleUserTooltip = () => {
		setShowMenu((prev) => !prev);
	};

	const avatarClickHandler = () => {
		if (showMenu) {
			return;
		}

		return setShowMenu(true);
	};

	return (
		<ChakraProvider theme={theme}>
			<Navbar avatarClickHandler={avatarClickHandler}/>
			<main className={`${styles.main} relative-element`}>
				{children}

				<AnimatePresence>
					{showMenu && <Menu clickHandler={toggleUserTooltip} />}
				</AnimatePresence>
			</main>
		</ChakraProvider>
	);
};

export default AppLayout;
