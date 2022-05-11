import { Avatar } from "@chakra-ui/react";
import PlaylistIcon from "../PlaylistIcon/PlaylistIcon";
import styles from "./PlaylistItemInModal.module.scss";

const PlaylistItemInModal = ({ cover, name, addSongToPlaylistHandler }) => {
	return (
		<div className={`${styles.container}`} onClick={addSongToPlaylistHandler}>
			<Avatar
				icon={<PlaylistIcon />}
				src={cover || `${process.env.NEXT_PUBLIC_API_URL}/general_cover.jpg`}
			/>
			<p className="body c-white">{name}</p>
		</div>
	);
};

export default PlaylistItemInModal;
