import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import {
	FiBriefcase,
	FiUsers,
	FiFileText,
	FiTrendingUp,
	FiClock,
} from "react-icons/fi";

const Home = () => {
	return (
		<div className="dashboard">
			<h1 className="dashboard-subtitle">
				Welcome to TalentFlow hiring platform
			</h1>
			<div className="stats-cards">
				<div className="stat-card">
					<div className="stat-icon blue">
						<FiBriefcase />
					</div>
					<div>
						<p className="stat-label">Active Jobs</p>
						<h2 className="stat-value">18</h2>
						<p className="stat-sub">of 25</p>
					</div>
				</div>

				<div className="stat-card">
					<div className="stat-icon green">
						<FiUsers />
					</div>
					<div>
						<p className="stat-label">Total Candidates</p>
						<h2 className="stat-value">1000</h2>
						<p className="stat-sub">47 this week</p>
					</div>
				</div>

				<div className="stat-card">
					<div className="stat-icon purple">
						<FiFileText />
					</div>
					<div>
						<p className="stat-label">Assessments</p>
						<h2 className="stat-value">3</h2>
						<p className="stat-sub">156 completed</p>
					</div>
				</div>
			</div>

			<div className="bottom-section">
				<div className="activity">
					<h3 className="section-title">
						Recent Activity <FiTrendingUp />
					</h3>
					<ul className="activity-list">
						<li>
							<span className="activity-icon blue">
								<FiBriefcase />
							</span>
							<div className="activity-content">
								New job posted: <strong>Senior Software Engineer</strong>
								<small>2 hours ago</small>
							</div>
						</li>
						<li>
							<span className="activity-icon green">
								<FiUsers />
							</span>
							<div className="activity-content">
								47 new candidates applied this week
								<small>1 day ago</small>
							</div>
						</li>
						<li>
							<span className="activity-icon purple">
								<FiFileText />
							</span>
							<div className="activity-content">
								Assessment updated for Product Manager role
								<small>3 days ago</small>
							</div>
						</li>
					</ul>
				</div>

				<div className="quick-actions">
					<h3 className="section-title">
						Quick Actions <FiClock />
					</h3>
					<div className="qa-card">
						<FiBriefcase className="qa-icon" />
						<div>
							<Link to="/jobs">
								<p className="qa-title">Manage Jobs</p>
							</Link>
							<p className="qa-sub">Create, edit, and organize job postings</p>
						</div>
					</div>
					<div className="qa-card">
						<FiUsers className="qa-icon" />
						<div>
							<Link to="./candidates">
								<p className="qa-title">Review Candidates</p>
							</Link>
							<p className="qa-sub">Browse and manage candidate applications</p>
						</div>
					</div>
					<div className="qa-card">
						<FiFileText className="qa-icon" />
						<div>
							<Link to="/assessments">
								<p className="qa-title">Build Assessments</p>
							</Link>
							<p className="qa-sub">Design and update candidate assessments</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
