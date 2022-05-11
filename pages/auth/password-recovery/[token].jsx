import NewPasswodForm from "components/Atoms/NewPasswodForm/NewPasswodForm";
import { useRouter } from "next/router";

const NewPassword = () => {
	const router = useRouter();
	const { token } = router.query;

	return (
		<section className="max-width all-height xxs-f-column xxs-f-center-xy xxs-g-2 c-white">
			<NewPasswodForm token={token} />
		</section>
	);
};

export default NewPassword;
