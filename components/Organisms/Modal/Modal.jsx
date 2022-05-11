import ReactDom from "react-dom";
import CloseIcon from "../../Atoms/CloseIcon/CloseIcon";
import styles from "./Modal.module.scss";
import fadeVariants from "../../../helpers/variants/fadeVariants";
import { motion } from "framer-motion";

const Modal = ({ closeModal, children }) => {
	return ReactDom.createPortal(
		<motion.div
			variants={fadeVariants}
			initial="initial"
			animate="animate"
			exit="exit"
			className={`${styles.modal_container} `}
		>
			<div className={`max-width all-height relative-element xxs-f-center-xy`}>
				{children}
				<button className={`${styles.close_button}`} onClick={closeModal}>
					<CloseIcon />
				</button>
			</div>
			<div className={styles.outside_container} onClick={closeModal}></div>
		</motion.div>,
		document.getElementById("modal")
	);
};

export default Modal;
