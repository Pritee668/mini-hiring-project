import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { makeServer } from "./mirage/server";
import "./index.css"; // if you have global styles

if (process.env.NODE_ENV === "development") {
	makeServer();
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
