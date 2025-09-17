import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { makeServer } from "./mirage/server";
import "./index.css";
if (
	process.env.NODE_ENV === "development" ||
	process.env.NODE_ENV === "production"
) {
	makeServer({ environment: process.env.NODE_ENV });
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
