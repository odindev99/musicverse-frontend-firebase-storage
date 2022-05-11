import { useRef } from "react";
import { useToast } from "@chakra-ui/react";
import { changeHandler, submitHandler } from "./UpdatePlaylistLogic";
import getJwt from "helpers/getJwt";

const UpdatePlaylist = ({ playlistId, closeModal, setData }) => {
	const formInputs = useRef();
	const token = getJwt();
	const toast = useToast();

	return (
		<section className="all-space xxs-f-center-xy">
			<form
				className="form update-form"
				onChange={(e) => changeHandler(e, formInputs)}
				onSubmit={(e) =>
					submitHandler(
						e,
						formInputs,
						playlistId,
						token,
						setData,
						toast,
						closeModal
					)
				}
			>
				<h3 className="t3 c-white text-center">Update Playlist</h3>
				<label htmlFor="newName">Playlist&apos;s name</label>
				<input type="text" name="newName" />

				<label htmlFor="cover">Cover</label>
				<input type="file" name="cover" />

				<button type="submit" className="button">
					Update
				</button>
			</form>
		</section>
	);
};

export default UpdatePlaylist;
