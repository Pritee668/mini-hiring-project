import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/screen/Home";
import Navbar from "./pages/Navbar";
import JobsPage from "./pages/screen/JobsPage";
import AssessmentsPage from "./pages/screen/AssessmentsPage";
import CandidatesPage from "./pages/screen/CandidatesPage";
import CandidateProfile from "./components/candidates/CandidateProfile";
import Footer from "./pages/Footer";
import AssessmentPageId from "./components/assessments/AssessmentPageId";
import "./index.css";

export default function App() {
	return (
		<div className="app">
			<Router>
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

				<Footer />
			</Router>
		</div>
	);
}
