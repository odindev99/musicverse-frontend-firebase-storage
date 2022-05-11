import { useToast } from "@chakra-ui/react";
import { useRef } from "react";
import { changeHandler, submitHandler } from "./AddSongFormLogic";

const AddSongForm = ({ setData }) => {
	const formInputs = useRef({});
	const token = localStorage.getItem("musicverse_jwt");
	const toast = useToast();

	return (
		<form
			className={`form add-song`}
			onChange={(e) => changeHandler(e, formInputs)}
			onSubmit={(e) => submitHandler(e, formInputs, token, setData, toast)}
		>
			<h3 className="t3 c-white text-center">Add New Song</h3>

			<label htmlFor="name" className="body c-white">
				Song&apos;s Name
			</label>
			<input type="text" name="name" />

			<label htmlFor="artist" className="body c-white">
				Song&apos;s Artist
			</label>
			<input type="text" name="artist" />

			<label htmlFor="track" className="body c-white">
				Add Song File
			</label>
			<input type="file" name="track" value={undefined} />

			<button type="submit" className="button">
				Upload Song
			</button>
		</form>
	);
};

export default AddSongForm;
