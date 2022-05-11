import styles from "./Menu.module.scss";
import { motion } from "framer-motion";
import userTooltipVariants from "../../../helpers/variants/userTooltipVariants";
import { useSelector } from "react-redux";
import MenuUserContent from "components/Atoms/MenuUserContent/MenuUserContent";
import MenuPublicContent from "components/Atoms/MenuPublicContent/MenuPublicContent";
import { useEffect } from "react";

const UserTooltip = ({ clickHandler }) => {
	const user = useSelector((state) => state.user.value);

	useEffect(() => {
		document.addEventListener("click", clickHandler);

		return () => document.removeEventListener("click", clickHandler);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<motion.div
			className={`${styles.container} xxs-px-10 xxs-py-5`}
			variants={userTooltipVariants}
			initial="initial"
			animate="animate"
			exit="exit"
		>
			{user ? <MenuUserContent /> : <MenuPublicContent />}
		</motion.div>
	);
};

export default UserTooltip;
