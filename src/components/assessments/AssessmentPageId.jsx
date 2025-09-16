import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AssessmentBuilder from "./AssessmentsBuilder";
import PreviewPane from "./PreviewPane";
import "./AssessmentPageId.css";

export default function AssessmentPageId() {
	const { jobId } = useParams();
	const [assessment, setAssessment] = useState({ sections: [] });
	const [responses, setResponses] = useState({});

	useEffect(() => {
		if (!jobId) return;
		fetch(`/api/assessments/${jobId}`)
			.then((res) => res.json())
			.then((data) => setAssessment(data.assessment || { sections: [] }))
			.catch((err) => console.error("Error fetching assessment:", err));
	}, [jobId]);

	const handleSubmit = async () => {
		try {
			const res = await fetch(`/api/assessments/${jobId}/submit`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ responses }),
			});

			if (!res.ok) throw new Error("Failed to submit");
			const result = await res.json();
			alert("Assessment submitted successfully!");
			console.log("Submitted data:", result);
		} catch (err) {
			console.error(err);
			alert("Error submitting assessment");
		}
	};

	return (
		// <div className="assessments-page">
		<>
			<h2>Assessment for Job ID: {jobId}</h2>
			<div className="assessments-container">
				<AssessmentBuilder
					assessment={assessment}
					setAssessment={setAssessment}
				/>
				<PreviewPane
					assessment={assessment}
					responses={responses}
					setResponses={setResponses}
					onSubmit={handleSubmit}
				/>
			</div>
		</>
		// </div>
	);
}
