import ProfileForm from "components/Organisms/ProfileForm/ProfileForm";
import useCheckUser from "hooks/useCheckUser";

const Perfil = () => {
	useCheckUser();
  
	return <ProfileForm />;
};

export default Perfil;
