import SuccesVerifyingAccount from "components/Atoms/SuccesVerifyingAccount/SuccesVerifyingAccount";
import useVerifyAccount from "hooks/useVerifyAccount";
import { useRouter } from "next/router";

const VerifyAccount = () => {
	const router = useRouter();
	const { token } = router.query;
	const verified = useVerifyAccount(token);

	return (
		<section className="max-width all-height xxs-f-column xxs-f-center-xy xxs-g-2 c-white">
			{verified === undefined && <div>Loading...</div>}

			{verified && (
				<>
					
					<SuccesVerifyingAccount />
				</>
			)}
		</section>
	);
};

export default VerifyAccount;
