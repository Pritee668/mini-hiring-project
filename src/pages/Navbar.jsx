import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiHome, FiBriefcase, FiUsers, FiFileText } from "react-icons/fi";
import "./Navbar.css";

const Navbar = () => {
	const [jobId, setJobId] = useState("");
	const navigate = useNavigate();

	const goToAssessment = () => {
		if (!jobId) return alert("Enter a Job ID");
		navigate(`/assessments/${jobId}`);
		setJobId("");
	};

	return (
		<nav className="navbar">
			<div className="navbar-logo">
				Talent<span>Flow</span>
			</div>
			<ul className="navbar-links">
				<li>
					<NavLink
						to="/"
						className="nav-link">
						<FiHome className="icon" /> Dashboard
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/jobs"
						className="nav-link">
						<FiBriefcase className="icon" /> Jobs
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/candidates"
						className="nav-link">
						<FiUsers className="icon" /> Candidates
					</NavLink>
				</li>
				<li>
					<NavLink
						to="/assessments"
						className="nav-link">
						<FiFileText className="icon" /> Assessments
					</NavLink>
				</li>
				{/* Job ID input inside navbar */}
				<li className="job-id-input">
					<input
						type="text"
						placeholder="Enter Job ID"
						value={jobId}
						onChange={(e) => setJobId(e.target.value)}
					/>
					<button onClick={goToAssessment}>Go</button>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
