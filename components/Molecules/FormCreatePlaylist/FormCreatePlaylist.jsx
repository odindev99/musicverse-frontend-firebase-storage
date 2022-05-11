import { useRef } from "react";
import { useToast } from "@chakra-ui/react";
import { submitHandler, changeHandler } from "./FormCreatePlaylistLogic";
import getJwt from "helpers/getJwt";

const FormCreatePlaylist = ({ setData }) => {
	const formInputs = useRef({ type: "public" });
	const token = getJwt();
	const toast = useToast();

	return (
		<section className="all-space xxs-f-center-xy">
			<form
				className={`form`}
				onChange={(e) => changeHandler(e, formInputs)}
				onSubmit={(e) => submitHandler(e, formInputs, token, setData, toast)}
			>
				<h3 className="t3 c-white text-center">Create Playlists</h3>

				<label htmlFor="name">Name</label>
				<input type="text" name="name" />

				<label htmlFor="description">Description</label>
				<textarea name="description" id="description" rows="2"></textarea>

				<label htmlFor="cover">Cover</label>
				<input type="file" name="cover" id="cover" />

				<label htmlFor="Type">Type</label>
				<select name="type" id="type">
					<option value="public">Public</option>
					<option value="private">Private</option>
				</select>

				<button type="submit" className="button">
					Create playlist
				</button>
			</form>
		</section>
	);
};

export default FormCreatePlaylist;
