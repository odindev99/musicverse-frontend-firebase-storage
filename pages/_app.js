import AppLayout from "../components/Organisms/AppLayout/AppLayout";
import { Provider } from "react-redux";
import store from "../store";
import useVerifyToken from "hooks/useVerifyToken";
import "styles/styles.scss";
import "nprogress/nprogress.css";
import Router from "next/router";
import Nprogress from "nprogress"; // Barra de progreso del top page
import LoadingSpinner from "components/Atoms/LoadingSpinner/LoadingSpinner";

Router.onRouteChangeStart = () => Nprogress.start();
Router.onRouteChangeComplete = () => Nprogress.done();
Router.onRouteChangeError = () => Nprogress.done();

const TokenHandler = ({ children }) => {
	const verifiedToken = useVerifyToken();

	if (verifiedToken) {
		return children;
	}

	return (
		<div className="spinner-container">
			<LoadingSpinner />
		</div>
	);
};

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<AppLayout>
				<TokenHandler>
					<Component {...pageProps} />
				</TokenHandler>
			</AppLayout>
		</Provider>
	);
}

export default MyApp;
