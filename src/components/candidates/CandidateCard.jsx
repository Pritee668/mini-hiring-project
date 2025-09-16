import React from "react";
import { Link } from "react-router-dom";
import "./CandidateCard.css";

export default function CandidateCard({ candidate }) {
	return (
		<Link
			to={`/candidates/${candidate.id}`}
			className="candidate-card">
			<div className="candidate-avatar">
				{candidate.name.charAt(0).toUpperCase()}
			</div>
			<div className="candidate-info">
				<h4>{candidate.name}</h4>
				<p className="email">{candidate.email}</p>
				<span className={`stage-badge ${candidate.stage.toLowerCase()}`}>
					{candidate.stage}
				</span>
			</div>
		</Link>
	);
}
