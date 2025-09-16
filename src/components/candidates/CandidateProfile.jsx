// CandidateProfile.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./CandidateProfile.css";

export default function CandidateProfile() {
	const { id } = useParams();
	const [candidate, setCandidate] = useState(null);
	const [loading, setLoading] = useState(true);
	const [visibleNotes, setVisibleNotes] = useState(5);

	// Correct stage order
	const stageOrder = [
		"applied",
		"screen",
		"tech",
		"offer",
		"hired",
		"rejected",
	];

	useEffect(() => {
		async function fetchCandidate() {
			try {
				const res = await fetch(`/api/candidates/${id}`);
				const data = await res.json();

				// ✅ Sort timeline by stage order
				if (data.candidate?.timeline) {
					data.candidate.timeline.sort(
						(a, b) => stageOrder.indexOf(a.stage) - stageOrder.indexOf(b.stage)
					);
				}

				setCandidate(data.candidate);
			} catch (error) {
				console.error("Error fetching candidate:", error);
			} finally {
				setLoading(false);
			}
		}
		fetchCandidate();
	}, [id]);

	if (loading)
		return <div className="loading">Loading candidate profile...</div>;
	if (!candidate) return <p className="not-found">Candidate not found</p>;

	// Get index of current stage
	const currentStageIndex = stageOrder.indexOf(candidate.stage);

	// Prepare timeline only up to current stage
	const timelineToShow = stageOrder.slice(0, currentStageIndex + 1);

	return (
		<div className="candidate-profile">
			{/* Header */}
			<div className="profile-header">
				<div className="avatar">{candidate.name.charAt(0).toUpperCase()}</div>
				<div>
					<h2>{candidate.name}</h2>
					<p className="email">{candidate.email}</p>
					<p className="stage-highlight">
						📍 Current Stage: <strong>{candidate.stage.toUpperCase()}</strong>
					</p>
				</div>
			</div>

			{/* Timeline */}
			<div className="profile-section">
				<h3>📌 Timeline</h3>
				<ul className="timeline">
					{timelineToShow.map((stage, i) => {
						const entry = candidate.timeline.find((t) => t.stage === stage);

						return (
							<li
								key={i}
								className={`timeline-item ${
									candidate.stage === stage ? "current" : ""
								}`}>
								<span className="stage">{stage}</span>
								{entry?.date ? (
									<span className="date">
										{new Date(entry.date).toLocaleDateString()}
									</span>
								) : (
									<span className="date pending">pending</span>
								)}
							</li>
						);
					})}
				</ul>
			</div>

			{/* Notes with pagination */}
			<div className="profile-section">
				<h3>📝 Notes</h3>
				<ul className="notes">
					{candidate.notes.slice(0, visibleNotes).map((n, i) => (
						<li
							key={i}
							className="note">
							<p>{n.text}</p>
							<span className="author">- {n.author}</span>
						</li>
					))}
				</ul>

				{visibleNotes < candidate.notes.length && (
					<button
						className="load-more"
						onClick={() => setVisibleNotes((prev) => prev + 5)}>
						Load More Notes
					</button>
				)}
			</div>
		</div>
	);
}
