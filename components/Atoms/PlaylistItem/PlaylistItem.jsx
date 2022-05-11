import styles from "./PlaylistItem.module.scss";
import Image from "next/image";

const PlaylistItem = ({ cover, name }) => {
	return (
		<div className={styles.container}>
			<div className={styles.cover}>
				<Image
					src={
						cover
							? cover.url
							: `${process.env.NEXT_PUBLIC_API_URL}/general_cover.jpg`
					}
					alt="Playlist cover"
					layout="fill"
					objectFit="cover"
				/>
			</div>
			<p className="body c-white text-center xxs-mt-5">{name}</p>
		</div>
	);
};

export default PlaylistItem;
