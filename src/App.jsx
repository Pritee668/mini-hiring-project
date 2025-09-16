import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import JobsPage from "./routes/JobsPage";
import AssessmentsPage from "./routes/AssessmentsPage";
import CandidatesPage from "./routes/CandidatesPage";
import CandidateProfile from "./components/candidates/CandidateProfile";
import Footer from "./pages/Footer";
import AssessmentPageId from "./components/assessments/AssessmentPageId";
import "./index.css";

export default function App() {
	return (
		<div className="app">
			<BrowserRouter>
				<Navbar />

				<Routes>
					<Route
						path="/"
						element={<Home />}
					/>
					<Route
						path="/jobs"
						element={<JobsPage />}
					/>
					<Route
						path="/candidates"
						element={<CandidatesPage />}
					/>
					<Route
						path="/candidates/:id"
						element={<CandidateProfile />}
					/>
					<Route
						path="/assessments"
						element={<AssessmentsPage />}
					/>
					<Route
						path="/assessments/:jobId"
						element={<AssessmentPageId />}
					/>
				</Routes>
			</BrowserRouter>
			<Footer />
		</div>
	);
}
