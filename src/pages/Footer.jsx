import React from "react";
import { FiFacebook, FiTwitter, FiLinkedin, FiMail } from "react-icons/fi";
import "./footer.css";

export default function Footer() {
	return (
		<footer className="footer">
			<div className="footer-container">
				<div className="footer-brand">
					<h2>TalentFlow</h2>
					<p>
						A mini hiring platform helping HR teams manage jobs, candidates, and
						assessments efficiently.
					</p>
				</div>
				<div className="footer-links">
					<h4>Quick Links</h4>
					<ul>
						<li>
							<a href="/">Home</a>
						</li>
						<li>
							<a href="/jobs">Jobs</a>
						</li>
						<li>
							<a href="/candidates">Candidates</a>
						</li>
						<li>
							<a href="/assessments">Assessments</a>
						</li>
					</ul>
				</div>
				<div className="footer-contact">
					<h4>Contact Us</h4>
					<p>Email: support@talentflow.com</p>
					<p>Phone: +91 98765 43210</p>
					<div className="footer-socials">
						<a href="#">
							<FiFacebook />
						</a>
						<a href="#">
							<FiTwitter />
						</a>
						<a href="#">
							<FiLinkedin />
						</a>
						<a href="mailto:support@talentflow.com">
							<FiMail />
						</a>
					</div>
				</div>
			</div>
			<div className="footer-bottom">
				<p>© {new Date().getFullYear()} TalentFlow. All rights reserved.</p>
			</div>
			<div className="footer-backtop">
				<button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
					↑
				</button>
			</div>
		</footer>
	);
}
