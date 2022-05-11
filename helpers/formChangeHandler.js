export default function formChangeHandler(e, formInputs) {
  formInputs.current = {
		...formInputs.current,
		[e.target.name]: e.target.value,
	};

	console.log(formInputs.current);
}