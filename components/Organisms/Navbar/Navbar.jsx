// import { useState } from "react";
import Link from "next/link";
// import UserTooltip from "../../Atoms/UserTooltip/UserTooltip";
import ProfileButton from "../../Molecules/ProfileButton/ProfileButton";
import styles from "./Navbar.module.scss";
import HeadphonesIcon from "../../Atoms/HeadphonesIcon/HeadphonesIcon";
import { useSelector } from "react-redux";

const Navbar = ({ openModal, avatarClickHandler }) => {
	const user = useSelector((state) => state.user.value);

	return (
		<nav className={`${styles.navbar} xxs-f-cross-center relative-element`}>
			<div className="max-width xxs-f-main-justify">
				<div className="all-height xxs-f-center-xy">
					<Link href="/">
						<a className="c-white t2 xxs-ml-15 xxs-f-row">
							<span className="xxs-mr-15">
								<HeadphonesIcon />
							</span>
							Musicverse
						</a>
					</Link>
				</div>
				{/* <h2 className="c-white t2">Musicverse</h2> */}
				<div className="xxs-f-center-xy">
					<ProfileButton clickHandler={avatarClickHandler} user={user} />
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
