import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";

const rootElement = document.getElementById("root");

if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<BrowserRouter basename={import.meta.env.VITE_APP_BASEURL}>
				<App />
			</BrowserRouter>
		</StrictMode>,
	);
} else {
	throw new Error("Failed to find the root element");
}
