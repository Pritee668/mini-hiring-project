// import React from "react";
// import "./PreviewPane.css";

// export default function PreviewPane({
// 	assessment,
// 	responses,
// 	setResponses,
// 	onSubmit,
// }) {
// 	const handleChange = (questionId, value) => {
// 		setResponses({ ...responses, [questionId]: value });
// 	};

// 	const shouldShow = (q) => {
// 		if (!q.showIf) return true;
// 		return responses[q.showIf.questionId] === q.showIf.value;
// 	};

// 	return (
// 		<div className="preview-pane">
// 			<h2 className="preview-title">Live Preview</h2>
// 			{assessment.sections.map((section) => (
// 				<div
// 					key={section.id}
// 					className="preview-section">
// 					<h3 className="section-title">{section.title}</h3>
// 					{section.questions.map(
// 						(q) =>
// 							shouldShow(q) && (
// 								<div
// 									key={q.id}
// 									className="preview-question">
// 									<label className="question-label">{q.text}</label>

// 									{q.type === "single-choice" &&
// 										q.options.map((opt, i) => (
// 											<div
// 												key={i}
// 												className="option">
// 												<input
// 													type="radio"
// 													name={q.id}
// 													checked={responses[q.id] === opt}
// 													onChange={() => handleChange(q.id, opt)}
// 												/>
// 												<span>{opt}</span>
// 											</div>
// 										))}

// 									{q.type === "multi-choice" &&
// 										q.options.map((opt, i) => (
// 											<div
// 												key={i}
// 												className="option">
// 												<input
// 													type="checkbox"
// 													checked={responses[q.id]?.includes(opt) || false}
// 													onChange={() => {
// 														const prev = responses[q.id] || [];
// 														if (prev.includes(opt)) {
// 															handleChange(
// 																q.id,
// 																prev.filter((o) => o !== opt)
// 															);
// 														} else {
// 															handleChange(q.id, [...prev, opt]);
// 														}
// 													}}
// 												/>
// 												<span>{opt}</span>
// 											</div>
// 										))}

// 									{q.type === "short-text" && (
// 										<input
// 											type="text"
// 											className="text-input"
// 											value={responses[q.id] || ""}
// 											maxLength={q.maxLength || undefined}
// 											onChange={(e) => handleChange(q.id, e.target.value)}
// 										/>
// 									)}

// 									{q.type === "long-text" && (
// 										<textarea
// 											className="text-input"
// 											value={responses[q.id] || ""}
// 											maxLength={q.maxLength || undefined}
// 											onChange={(e) => handleChange(q.id, e.target.value)}
// 										/>
// 									)}

// 									{q.type === "numeric" && (
// 										<input
// 											type="number"
// 											className="text-input"
// 											value={responses[q.id] || ""}
// 											min={q.range?.min || undefined}
// 											max={q.range?.max || undefined}
// 											onChange={(e) =>
// 												handleChange(q.id, Number(e.target.value))
// 											}
// 										/>
// 									)}

// 									{q.type === "file" && (
// 										<input
// 											type="file"
// 											className="file-input"
// 										/>
// 									)}
// 								</div>
// 							)
// 					)}
// 				</div>
// 			))}
// 			<button
// 				className="submit-btn"
// 				onClick={onSubmit}>
// 				Submit Assessment
// 			</button>
// 		</div>
// 	);
// }

import React from "react";
import "./PreviewPane.css";

export default function PreviewPane({
	assessment,
	responses,
	setResponses,
	onSubmit,
}) {
	const handleChange = (questionId, value) => {
		setResponses({ ...responses, [questionId]: value });
	};

	const shouldShow = (q) => {
		if (!q.showIf) return true;
		return responses[q.showIf.questionId] === q.showIf.value;
	};

	return (
		<div className="preview-pane">
			<h2 className="preview-title">Live Preview</h2>

			{assessment.sections.map((section) => (
				<div
					key={section.id}
					className="preview-section">
					<h3 className="section-title">{section.title}</h3>

					{section.questions.map(
						(q) =>
							shouldShow(q) && (
								<div
									key={q.id}
									className="preview-question">
									<label className="question-label">{q.text}</label>

									{/* Single Choice */}
									{q.type === "single-choice" &&
										q.options.map((opt, i) => (
											<div
												key={i}
												className="option">
												<input
													type="radio"
													name={q.id}
													checked={responses[q.id] === opt}
													onChange={() => handleChange(q.id, opt)}
												/>
												<span>{opt}</span>
											</div>
										))}

									{/* Multi Choice */}
									{q.type === "multi-choice" &&
										q.options.map((opt, i) => (
											<div
												key={i}
												className="option">
												<input
													type="checkbox"
													checked={responses[q.id]?.includes(opt) || false}
													onChange={() => {
														const prev = responses[q.id] || [];
														if (prev.includes(opt)) {
															handleChange(
																q.id,
																prev.filter((o) => o !== opt)
															);
														} else {
															handleChange(q.id, [...prev, opt]);
														}
													}}
												/>
												<span>{opt}</span>
											</div>
										))}

									{/* Short Text */}
									{q.type === "short-text" && (
										<input
											type="text"
											className="text-input"
											value={responses[q.id] || ""}
											maxLength={q.maxLength || undefined}
											onChange={(e) => handleChange(q.id, e.target.value)}
										/>
									)}

									{/* Long Text */}
									{q.type === "long-text" && (
										<textarea
											className="text-input"
											value={responses[q.id] || ""}
											maxLength={q.maxLength || undefined}
											onChange={(e) => handleChange(q.id, e.target.value)}
										/>
									)}

									{/* Numeric */}
									{q.type === "numeric" && (
										<input
											type="number"
											className="text-input"
											value={responses[q.id] || ""}
											min={q.range?.min || undefined}
											max={q.range?.max || undefined}
											onChange={(e) =>
												handleChange(q.id, Number(e.target.value))
											}
										/>
									)}

									{/* File Upload */}
									{q.type === "file" && (
										<input
											type="file"
											className="file-input"
											onChange={(e) => handleChange(q.id, e.target.files[0])}
										/>
									)}
								</div>
							)
					)}
				</div>
			))}

			<button
				className="submit-btn"
				onClick={onSubmit}>
				Submit Assessment
			</button>
		</div>
	);
}
