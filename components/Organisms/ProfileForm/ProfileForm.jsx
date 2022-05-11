import { Avatar } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import LinkIcon from "components/Atoms/LinkIcon/LinkIcon";
import { useRef, useState } from "react";
import styles from "./ProfileForm.module.scss";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
	avatarClickHandler,
	onChangeInputHandler,
	submitHandler,
	requestPasswordChange,
} from "./ProfileFormLogic";
import Modal from "components/Organisms/Modal/Modal";
import { useModal } from "hooks/useModal";
import { AnimatePresence } from "framer-motion";
import ChangeUsernameForm from "components/Atoms/ChangeUsernameForm/ChangeUsernameForm";
import ChangeEmailForm from "components/Atoms/ChangeEmailForm/ChangeEmailForm";
import SucceededNotification from "components/Atoms/SucceededNotification/SucceededNotification";
import DeleteUserWarning from "components/Atoms/DeleteUserWarning/DeleteUserWarning";
import DeleteUserForm from "components/Atoms/DeleteUserForm/DeleteUserForm";
import { useRouter } from "next/router";
import useGetRequest from "hooks/useGetRequest";
import getJwt from "helpers/getJwt";
import ProfileLoadingSpinner from "components/Atoms/ProfileLoadingSpinner/ProfileLoadingSpinner";

const passwordChangeHandler = (
	userEmail,
	setModalChildren,
	openModal,
	toast
) => {
	requestPasswordChange(userEmail)
		.then(() => {
			setModalChildren(
				<section className="all-space xxs-f-center-xy">
					<SucceededNotification userEmail={userEmail} sectionPassword />
				</section>
			);
			openModal();
		})
		.catch((e) =>
			toast({
				title: e.message,
				status: "error",
				position: "top-right",
				isClosable: true,
			})
		);
};

const ProfileForm = () => {
	const router = useRouter();
	const [avatar, setAvatar] = useState();
	const [modalChildren, setModalChildren] = useState();
	const [isOpenModal, openModal, closeModal] = useModal();
	const inputRef = useRef();
	const user = useSelector((state) => state.user.value);
	const dispatch = useDispatch();
	const token = getJwt();
	const toast = useToast();
	const { data, loading } = useGetRequest(
		`${process.env.NEXT_PUBLIC_API_URL}/users/tracks-and-playlist-quantities`,
		token
	);

	return (
		<>
			<section className={`max-width`}>
				<div className={`${styles.container}`}>
					<form
						className={`xxs-f-column ${styles.avatar_container}`}
						onSubmit={(e) => submitHandler(e, inputRef, token, toast, dispatch)}
					>
						<button type="button" onClick={() => avatarClickHandler(inputRef)}>
							<Avatar
								size="xl"
								bg="#7a7a7a"
								src={avatar || user?.avatar?.url}
							/>
						</button>

						<input
							type="file"
							ref={inputRef}
							onChange={(e) => onChangeInputHandler(e, toast, setAvatar)}
						/>

						<button className={`button ${!avatar && "hidden"}`} type="submit">
							Update avatar
						</button>
					</form>

					<div className={`${styles.user_inf_container}`}>
						<div className={styles.text_button}>
							<p className="body c-white">
								Username: <span className="body bold">{user?.username}</span>
							</p>
							<button
								className="button"
								onClick={() => {
									setModalChildren(
										<ChangeUsernameForm
											token={token}
											closeModal={closeModal}
											dispatch={dispatch}
											toast={toast}
										/>
									);
									return openModal();
								}}
							>
								Change username
							</button>
						</div>
						<div className={styles.text_button}>
							<p className="body c-white">
								Email: <span className="body bold">{user?.email}</span>
							</p>
							<button
								className="button"
								onClick={() => {
									setModalChildren(
										<ChangeEmailForm token={token} toast={toast} />
									);
									return openModal();
								}}
							>
								Change email
							</button>
						</div>
						<div>
							<p className="body c-white">
								Uploaded songs:{" "}
								<span className="body bold">
									{data?.uploadedTracksQuantity}
								</span>
							</p>
							{loading && <ProfileLoadingSpinner />}
							<Link href="/uploaded-songs">
								<a>
									<LinkIcon />
								</a>
							</Link>
						</div>
						<div>
							<p className="body c-white">
								Liked songs:{" "}
								<span className="body bold">{data?.likedTracksQuantity}</span>
							</p>
							{loading && <ProfileLoadingSpinner />}
							<Link href="/liked-songs">
								<a>
									<LinkIcon />
								</a>
							</Link>
						</div>
						<div>
							<p className="body c-white">
								Created Playlists:{" "}
								<span className="body bold">{data?.playlistsQuantity}</span>
							</p>
							{loading && <ProfileLoadingSpinner />}
							<Link href="/playlists">
								<a>
									<LinkIcon />
								</a>
							</Link>
						</div>
						<button
							className="button"
							onClick={() =>
								passwordChangeHandler(
									user.email,
									setModalChildren,
									openModal,
									toast
								)
							}
						>
							Change password
						</button>
						<button
							className="button red"
							onClick={() => {
								setModalChildren(
									<DeleteUserWarning
										email={user.email}
										token={token}
										toast={toast}
										showDeleteUserForm={() =>
											setModalChildren(
												<DeleteUserForm
													email={user.email}
													token={token}
													dispatch={dispatch}
													toast={toast}
													router={router}
												/>
											)
										}
									/>
								);
								openModal();
							}}
						>
							Delete user
						</button>
					</div>
				</div>
			</section>

			<AnimatePresence>
				{isOpenModal && <Modal closeModal={closeModal}>{modalChildren}</Modal>}
			</AnimatePresence>
		</>
	);
};

export default ProfileForm;
