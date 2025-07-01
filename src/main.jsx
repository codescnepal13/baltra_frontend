import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import "react-quill/dist/quill.snow.css";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./redux/store/store.jsx";
import { Provider } from "react-redux";
import App from "./App.jsx";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <HelmetProvider>
        <App />
        </HelmetProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
