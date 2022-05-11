import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "store/reducers/user";

const logOutHandler = (dispatch, router) => {
	localStorage.removeItem("musicverse_jwt");
	dispatch(setUser(null));
	return router.push("/");
};

const MenuUserContent = () => {
	const dispatch = useDispatch();
	const router = useRouter();
	const user = useSelector((state) => state.user.value);

	return (
		<>
			<Link href="/">
				<a className="body c-white block-element">All songs</a>
			</Link>
			<Link href="/liked-songs">
				<a className="body c-white block-element">Liked songs</a>
			</Link>
			<Link href="/songs-uploaded-by-user">
				<a className="body c-white block-element">
					Uploaded by {user.username}
				</a>
			</Link>
			<Link href="/playlists">
				<a className="body c-white block-element">All Playlists</a>
			</Link>
			<Link href="/user-playlists">
				<a className="body c-white block-element">{user.username} playlists</a>
			</Link>
			<Link href="/profile">
				<a className="body c-white block-element">View profile</a>
			</Link>
			<button
				className="body c-white"
				onClick={() => logOutHandler(dispatch, router)}
			>
				Log out
			</button>
		</>
	);
};

export default MenuUserContent;
