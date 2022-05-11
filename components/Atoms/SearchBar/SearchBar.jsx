import styles from "./SearchBar.module.scss";
import debounce from "lodash.debounce";
import { useCallback } from "react";

const searchHandler = (e, setOffset, setSearch) => {
	setOffset(0);
	setSearch(e.target.value);
};

const SearchBar = ({ setOffset, setSearch }) => {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debounceChangeHandler = useCallback(
		debounce(
			(e, setOffset, setSearch) => searchHandler(e, setOffset, setSearch),
			500
		),
		[]
	);

	return (
		<div className={`${styles.form} all-width xxs-f-main-center xxs-mt-40`}>
			<input
				placeholder="Search"
				onChange={(e) => debounceChangeHandler(e, setOffset, setSearch)}
			/>
		</div>
	);
};

export default SearchBar;
