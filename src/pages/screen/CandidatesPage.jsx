import React, { useEffect, useState } from "react";
import CandidatesKanban from "../../components/candidates/CandidatesKanban";
import "./CandidatesPage.css";

export default function CandidatesPage() {
	const [candidates, setCandidates] = useState([]);
	const [loading, setLoading] = useState(true);
	const [search, setSearch] = useState("");
	const [stageFilter, setStageFilter] = useState("");

	const stages = ["applied", "screen", "tech", "offer", "hired", "rejected"];

	// Fetch candidates from API
	useEffect(() => {
		async function fetchCandidates() {
			setLoading(true);
			const res = await fetch("/api/candidates");
			const data = await res.json();
			setCandidates(data.candidates);
			setLoading(false);
		}
		fetchCandidates();
	}, []);

	// Filter candidates by search term and stage
	const filteredCandidates = candidates
		.filter(
			(c) =>
				c.name.toLowerCase().includes(search.toLowerCase()) ||
				c.email.toLowerCase().includes(search.toLowerCase())
		)
		.filter((c) => (stageFilter ? c.stage === stageFilter : true));

	return (
		<div className="candidates-page">
			<h2>Candidates</h2>

			{/* Filters */}
			<div className="filters">
				<input
					type="text"
					placeholder="Search by name/email..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<select
					value={stageFilter}
					onChange={(e) => setStageFilter(e.target.value)}>
					<option value="">All Stages</option>
					{stages.map((s) => (
						<option
							key={s}
							value={s}>
							{s}
						</option>
					))}
				</select>
			</div>

			{/* Loading state */}
			{loading ? (
				<p>Loading candidates...</p>
			) : (
				<CandidatesKanban
					candidates={filteredCandidates}
					setCandidates={setCandidates}
				/>
			)}
		</div>
	);
}
