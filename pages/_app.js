// Libs
import { Toaster } from "react-hot-toast";
import { NextUIProvider } from "@nextui-org/react";

// Redux
import { store } from "../redux/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Toaster position="top-right" />
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </Provider>
  );
}

export default MyApp;
