import styles from "./PlaylistHeader.module.scss";
import Image from "next/image";
import { useToast } from "@chakra-ui/react";
import { deleteHandler } from "./PlaylistHeaderLogic";

const PlaylistHeader = ({ playlistData, user, router, openModal, token }) => {
	const toast = useToast();
	const { data } = playlistData;

	return (
		<header className={`${styles.header} s-f-row xxs-mt-30`}>
			<div className={`${styles.cover_container} relative-element`}>
				<Image
					src={
						data.playlistDetails.cover
							? data.playlistDetails.cover.url
							: `${process.env.NEXT_PUBLIC_API_URL}/general_cover.jpg`
					}
					alt="Playlist cover"
					layout="fill"
					priority
				/>
			</div>

			<div
				className={`xxs-py-25 xxs-px-25 xxs-f-column ${styles.control_container}`}
			>
				<h5 className="t5 c-white">{data.playlistDetails.name}</h5>
				<p className="c-white">{data.playlistDetails.tracksQuantity} tracks</p>

				{/* Los usuarios solo pueden editar o eliminar una playlist si es el usuario que la creo */}
				{user && data.playlistDetails.createdByUser === user.userId && (
					<div className="xxs-f-row wrap">
						{/* <button className="button">Add song</button> */}
						<button className="button orange" onClick={openModal}>
							Edit
						</button>
						<button
							className="button red"
							onClick={() =>
								deleteHandler(data.playlistDetails._id, token, toast, router)
							}
						>
							Delete
						</button>
					</div>
				)}
			</div>
		</header>
	);
};

export default PlaylistHeader;
