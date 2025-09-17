import React from "react";
import "./AssessmentsBuilder.css";

export default function AssessmentBuilder({ assessment, setAssessment }) {
	const addSection = () => {
		setAssessment({
			...assessment,
			sections: [
				...assessment.sections,
				{ id: Date.now().toString(), title: "New Section", questions: [] },
			],
		});
	};

	const deleteSection = (sectionId) => {
		setAssessment({
			...assessment,
			sections: assessment.sections.filter((s) => s.id !== sectionId),
		});
	};

	const moveSection = (sectionId, direction) => {
		const index = assessment.sections.findIndex((s) => s.id === sectionId);
		const sections = [...assessment.sections];
		if (direction === "up" && index > 0) {
			[sections[index - 1], sections[index]] = [
				sections[index],
				sections[index - 1],
			];
		} else if (direction === "down" && index < sections.length - 1) {
			[sections[index + 1], sections[index]] = [
				sections[index],
				sections[index + 1],
			];
		}
		setAssessment({ ...assessment, sections });
	};

	const addQuestion = (sectionId, type) => {
		if (type === "") return; // prevent accidental add when no type chosen
		setAssessment({
			...assessment,
			sections: assessment.sections.map((s) =>
				s.id === sectionId
					? {
							...s,
							questions: [
								...s.questions,
								{
									id: Date.now().toString(),
									type,
									text: "New Question",
									options: type.includes("choice") ? ["Option 1"] : [],
									required: false,
									showIf: null,
									maxLength: null,
									range: { min: 0, max: 100 },
								},
							],
					  }
					: s
			),
		});
	};

	const deleteQuestion = (sectionId, questionId) => {
		setAssessment({
			...assessment,
			sections: assessment.sections.map((s) =>
				s.id === sectionId
					? { ...s, questions: s.questions.filter((q) => q.id !== questionId) }
					: s
			),
		});
	};

	const moveQuestion = (sectionId, questionId, direction) => {
		const sections = [...assessment.sections];
		const section = sections.find((s) => s.id === sectionId);
		const index = section.questions.findIndex((q) => q.id === questionId);

		if (direction === "up" && index > 0) {
			[section.questions[index - 1], section.questions[index]] = [
				section.questions[index],
				section.questions[index - 1],
			];
		} else if (direction === "down" && index < section.questions.length - 1) {
			[section.questions[index + 1], section.questions[index]] = [
				section.questions[index],
				section.questions[index + 1],
			];
		}
		setAssessment({ ...assessment, sections });
	};

	return (
		<div className="assessment-builder">
			<h2>Builder</h2>
			<button
				className="add-section-btn"
				onClick={addSection}>
				Add Section
			</button>

			{assessment.sections.map((section) => (
				<div
					key={section.id}
					className="section-card">
					<div className="section-header">
						<input
							className="section-title"
							value={section.title}
							onChange={(e) =>
								setAssessment({
									...assessment,
									sections: assessment.sections.map((s) =>
										s.id === section.id ? { ...s, title: e.target.value } : s
									),
								})
							}
						/>
						<div className="section-controls">
							<button onClick={() => moveSection(section.id, "up")}>↑</button>
							<button onClick={() => moveSection(section.id, "down")}>↓</button>
							<button onClick={() => deleteSection(section.id)}>Delete</button>
						</div>
					</div>

					<div className="question-buttons">
						<select
							onChange={(e) => {
								addQuestion(section.id, e.target.value);
								e.target.value = ""; // reset after adding
							}}
							defaultValue="">
							<option
								value=""
								disabled>
								➕ Add Question Type
							</option>
							<option value="single-choice">Single Choice</option>
							<option value="multi-choice">Multiple Choice</option>
							<option value="short-text">Short Text</option>
							<option value="long-text">Long Text</option>
							<option value="numeric">Numeric</option>
							<option value="file">File Upload</option>
						</select>
					</div>

					{section.questions.map((q) => (
						<div
							key={q.id}
							className="question-card">
							<input
								className="question-input"
								value={q.text}
								onChange={(e) =>
									setAssessment({
										...assessment,
										sections: assessment.sections.map((s) =>
											s.id === section.id
												? {
														...s,
														questions: s.questions.map((ques) =>
															ques.id === q.id
																? { ...ques, text: e.target.value }
																: ques
														),
												  }
												: s
										),
									})
								}
							/>

							<div className="question-controls">
								<button onClick={() => moveQuestion(section.id, q.id, "up")}>
									↑
								</button>
								<button onClick={() => moveQuestion(section.id, q.id, "down")}>
									↓
								</button>
								<button onClick={() => deleteQuestion(section.id, q.id)}>
									Delete
								</button>
							</div>

							{(q.type === "single-choice" || q.type === "multi-choice") && (
								<div className="options-editor">
									<label>Options:</label>
									{q.options.map((opt, i) => (
										<div key={i}>
											<input
												type="text"
												value={opt}
												onChange={(e) => {
													const newOptions = [...q.options];
													newOptions[i] = e.target.value;
													setAssessment({
														...assessment,
														sections: assessment.sections.map((s) =>
															s.id === section.id
																? {
																		...s,
																		questions: s.questions.map((ques) =>
																			ques.id === q.id
																				? { ...ques, options: newOptions }
																				: ques
																		),
																  }
																: s
														),
													});
												}}
											/>
											<button
												onClick={() => {
													const newOptions = q.options.filter(
														(_, idx) => idx !== i
													);
													setAssessment({
														...assessment,
														sections: assessment.sections.map((s) =>
															s.id === section.id
																? {
																		...s,
																		questions: s.questions.map((ques) =>
																			ques.id === q.id
																				? { ...ques, options: newOptions }
																				: ques
																		),
																  }
																: s
														),
													});
												}}>
												Delete
											</button>
										</div>
									))}
									<button
										onClick={() => {
											setAssessment({
												...assessment,
												sections: assessment.sections.map((s) =>
													s.id === section.id
														? {
																...s,
																questions: s.questions.map((ques) =>
																	ques.id === q.id
																		? {
																				...ques,
																				options: [...ques.options, ""],
																		  }
																		: ques
																),
														  }
														: s
												),
											});
										}}>
										Add Option
									</button>
								</div>
							)}
						</div>
					))}
				</div>
			))}
		</div>
	);
}
