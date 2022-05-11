import styles from "./AddSongButton.module.scss"

const AddSongButton = ({clickHandler}) => {
  return (
    <button className={`${styles.button}`} onClick={clickHandler}>
      +
    </button>
  );
}

export default AddSongButton;