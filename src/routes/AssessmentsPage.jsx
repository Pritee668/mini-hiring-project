// // // import React, { useState, useEffect } from "react";
// // // import AssessmentBuilder from "../components/assessments/AssessmentsBuilder";
// // // import PreviewPane from "../components/assessments/PreviewPane";
// // // import "./AssessmentsPage.css";

// // // export default function AssessmentsPage({ jobId }) {
// // // 	const [assessment, setAssessment] = useState({ sections: [] });
// // // 	const [responses, setResponses] = useState({});

// // // 	// Fetch assessment by jobId
// // // 	useEffect(() => {
// // // 		fetch(`/assessments/${jobId}`)
// // // 			.then((res) => res.json())
// // // 			.then((data) => setAssessment(data.assessment || { sections: [] }));
// // // 	}, [jobId]);

// // // 	const handleSubmit = async () => {
// // // 		try {
// // // 			const res = await fetch(`/assessments/${jobId}/submit`, {
// // // 				method: "POST",
// // // 				headers: { "Content-Type": "application/json" },
// // // 				body: JSON.stringify({ responses }),
// // // 			});

// // // 			if (!res.ok) throw new Error("Failed to submit");

// // // 			const result = await res.json();
// // // 			alert("Assessment submitted successfully!");
// // // 			console.log("Submitted data:", result);
// // // 		} catch (err) {
// // // 			console.error(err);
// // // 			alert("Error submitting assessment");
// // // 		}
// // // 	};

// // // 	return (
// // // 		<div className="assessments-page">
// // // 			<AssessmentBuilder
// // // 				assessment={assessment}
// // // 				setAssessment={setAssessment}
// // // 			/>
// // // 			<PreviewPane
// // // 				assessment={assessment}
// // // 				responses={responses}
// // // 				setResponses={setResponses}
// // // 				onSubmit={handleSubmit}
// // // 			/>
// // // 		</div>
// // // 	);
// // // }

// // import React, { useState, useEffect } from "react";
// // import AssessmentBuilder from "../components/assessments/AssessmentsBuilder";
// // import PreviewPane from "../components/assessments/PreviewPane";
// // import "./AssessmentsPage.css";

// // export default function AssessmentsPage({ jobId }) {
// // 	const [assessment, setAssessment] = useState({ sections: [] });
// // 	const [responses, setResponses] = useState({});
// // 	const [submitting, setSubmitting] = useState(false);

// // 	// Fetch assessment by jobId
// // 	useEffect(() => {
// // 		fetch(`/api/assessments/${jobId}/submit`, {
// // 			// ✅ add /api
// // 			method: "POST",
// // 			headers: { "Content-Type": "application/json" },
// // 			body: JSON.stringify({ responses }),
// // 		});
// // 	}, [jobId]);

// // 	// 	fetch(`/assessments/${jobId}`)
// // 	// 		.then((res) => res.json())
// // 	// 		.then((data) => setAssessment(data.assessment || { sections: [] }));
// // 	// }, [jobId]);

// // 	const handleSubmit = async () => {
// // 		if (submitting) return; // prevent double submit
// // 		setSubmitting(true);

// // 		try {
// // 			// Check if there are file inputs
// // 			const hasFile = Object.values(responses).some(
// // 				(val) => val instanceof File
// // 			);

// // 			let body;
// // 			let headers = {};

// // 			if (hasFile) {
// // 				// Use FormData for file upload
// // 				body = new FormData();
// // 				for (const [key, value] of Object.entries(responses)) {
// // 					body.append(key, value);
// // 				}
// // 			} else {
// // 				// JSON submission
// // 				body = JSON.stringify({ responses });
// // 				headers["Content-Type"] = "application/json";
// // 			}

// // 			const res = await fetch(`/assessments/${jobId}/submit`, {
// // 				method: "POST",
// // 				headers,
// // 				body,
// // 			});

// // 			if (!res.ok) throw new Error("Failed to submit");

// // 			const result = await res.json();
// // 			alert("Assessment submitted successfully!");
// // 			console.log("Submitted data:", result);
// // 		} catch (err) {
// // 			console.error(err);
// // 			alert("Error submitting assessment");
// // 		} finally {
// // 			setSubmitting(false);
// // 		}
// // 	};

// // 	return (
// // 		<div className="assessments-page">
// // 			<AssessmentBuilder
// // 				assessment={assessment}
// // 				setAssessment={setAssessment}
// // 			/>
// // 			<PreviewPane
// // 				assessment={assessment}
// // 				responses={responses}
// // 				setResponses={setResponses}
// // 				onSubmit={handleSubmit}
// // 			/>
// // 		</div>
// // 	);
// // }

import React, { useState, useEffect } from "react";
import AssessmentBuilder from "../components/assessments/AssessmentsBuilder";
import PreviewPane from "../components/assessments/PreviewPane";
import "./AssessmentsPage.css";

export default function AssessmentsPage({ jobId }) {
	const [assessment, setAssessment] = useState({ sections: [] });
	const [responses, setResponses] = useState({});
	const [submitting, setSubmitting] = useState(false);

	// Fetch assessment by jobId
	useEffect(() => {
		fetch(`/api/assessments/${jobId}`) // ✅ add /api
			.then((res) => res.json())
			.then((data) => setAssessment(data.assessment || { sections: [] }))
			.catch((err) => console.error("Error fetching assessment:", err));
	}, [jobId]);

	const handleSubmit = async () => {
		if (submitting) return; // prevent double submit
		setSubmitting(true);

		try {
			// Replace File objects with file names
			const responsesToSend = { ...responses };
			for (let key in responsesToSend) {
				if (responsesToSend[key] instanceof File) {
					responsesToSend[key] = responsesToSend[key].name;
				}
			}

			const res = await fetch(`/api/assessments/${jobId}/submit`, {
				// ✅ /api
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ responses: responsesToSend }),
			});

			if (!res.ok) throw new Error("Failed to submit");

			const result = await res.json();
			alert("Assessment submitted successfully!");
			console.log("Submitted data:", result);
		} catch (err) {
			console.error(err);
			alert("Error submitting assessment");
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="assessments-page">
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
	);
}
