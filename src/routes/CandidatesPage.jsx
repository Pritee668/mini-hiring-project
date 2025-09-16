// // // import React, { useEffect, useState } from "react";
// // // import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// // // import { Link, useNavigate } from "react-router-dom";
// // // import "./CandidatesPage.css";

// // // export default function CandidatesPage() {
// // // 	const [candidates, setCandidates] = useState([]);
// // // 	const [loading, setLoading] = useState(true);
// // // 	const [search, setSearch] = useState("");
// // // 	const [stageFilter, setStageFilter] = useState("");

// // // 	const stages = ["applied", "screen", "tech", "offer", "hired", "rejected"];

// // // 	useEffect(() => {
// // // 		async function fetchCandidates() {
// // // 			setLoading(true);
// // // 			const res = await fetch("/api/candidates");
// // // 			const data = await res.json();
// // // 			// setCandidates(data.candidates);
// // // 			setLoading(false);
// // // 		}
// // // 		fetchCandidates();
// // // 	}, []);

// // // 	// Filter candidates by name/email and stage
// // // 	const filteredCandidates = candidates
// // // 		.filter(
// // // 			(c) =>
// // // 				c.name.toLowerCase().includes(search.toLowerCase()) ||
// // // 				c.email.toLowerCase().includes(search.toLowerCase())
// // // 		)
// // // 		.filter((c) => (stageFilter ? c.stage === stageFilter : true));

// // // 	// Drag-and-drop handler
// // // 	const handleDragEnd = (result) => {
// // // 		if (!result.destination) return;

// // // 		const { source, destination, draggableId } = result;

// // // 		// If moved between stages
// // // 		if (source.droppableId !== destination.droppableId) {
// // // 			setCandidates((prev) =>
// // // 				prev.map((c) =>
// // // 					c.id === draggableId ? { ...c, stage: destination.droppableId } : c
// // // 				)
// // // 			);
// // // 		}
// // // 	};

// // // 	return (
// // // 		<div className="candidates-page">
// // // 			<h2>Candidates</h2>

// // // 			<div className="filters">
// // // 				<input
// // // 					type="text"
// // // 					placeholder="Search by name/email..."
// // // 					value={search}
// // // 					onChange={(e) => setSearch(e.target.value)}
// // // 				/>
// // // 				<select
// // // 					value={stageFilter}
// // // 					onChange={(e) => setStageFilter(e.target.value)}>
// // // 					<option value="">All Stages</option>
// // // 					{stages.map((s) => (
// // // 						<option
// // // 							key={s}
// // // 							value={s}>
// // // 							{s}
// // // 						</option>
// // // 					))}
// // // 				</select>
// // // 			</div>

// // // 			{loading ? (
// // // 				<p>Loading...</p>
// // // 			) : (
// // // 				<DragDropContext onDragEnd={handleDragEnd}>
// // // 					<div className="kanban-board">
// // // 						{stages.map((stage) => (
// // // 							<Droppable
// // // 								droppableId={stage}
// // // 								key={stage}>
// // // 								{(provided) => (
// // // 									<div
// // // 										className="kanban-column"
// // // 										ref={provided.innerRef}
// // // 										{...provided.droppableProps}>
// // // 										<h3>{stage.toUpperCase()}</h3>
// // // 										{filteredCandidates
// // // 											.filter((c) => c.stage === stage)
// // // 											.map((candidate, index) => (
// // // 												<Draggable
// // // 													key={candidate.id}
// // // 													draggableId={candidate.id}
// // // 													index={index}>
// // // 													{(provided) => (
// // // 														<div
// // // 															className="candidate-card"
// // // 															ref={provided.innerRef}
// // // 															{...provided.draggableProps}
// // // 															{...provided.dragHandleProps}>
// // // 															<Link to={`/candidates/${candidate.id}`}>
// // // 																<strong>{candidate.name}</strong>
// // // 															</Link>
// // // 															<p>{candidate.email}</p>
// // // 															<p>Notes: {candidate.notes.length}</p>
// // // 														</div>
// // // 													)}
// // // 												</Draggable>
// // // 											))}
// // // 										{provided.placeholder}
// // // 									</div>
// // // 								)}
// // // 							</Droppable>
// // // 						))}
// // // 					</div>
// // // 				</DragDropContext>
// // // 			)}
// // // 		</div>
// // // 	);
// // // }

// // import React, { useEffect, useState } from "react";
// // import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// // import { Link } from "react-router-dom";
// // import "./CandidatesPage.css";

// // export default function CandidatesPage() {
// // 	const [candidates, setCandidates] = useState([]);
// // 	const [loading, setLoading] = useState(true);
// // 	const [search, setSearch] = useState("");
// // 	const [stageFilter, setStageFilter] = useState("");

// // 	const stages = ["applied", "screen", "tech", "offer", "hired", "rejected"];

// // 	useEffect(() => {
// // 		async function fetchCandidates() {
// // 			setLoading(true);
// // 			const res = await fetch("/api/candidates");
// // 			const data = await res.json();
// // 			setCandidates(data.candidates);
// // 			setLoading(false);
// // 		}
// // 		fetchCandidates();
// // 	}, []);

// // 	// Filter candidates by name/email and stage
// // 	const filteredCandidates = candidates
// // 		.filter(
// // 			(c) =>
// // 				c.name.toLowerCase().includes(search.toLowerCase()) ||
// // 				c.email.toLowerCase().includes(search.toLowerCase())
// // 		)
// // 		.filter((c) => (stageFilter ? c.stage === stageFilter : true));

// // 	// Decide which stages to render (all or just selected one)
// // 	const visibleStages = stageFilter ? [stageFilter] : stages;

// // 	// Drag-and-drop handler
// // 	const handleDragEnd = (result) => {
// // 		if (!result.destination) return;
// // 		const { source, destination, draggableId } = result;

// // 		if (source.droppableId !== destination.droppableId) {
// // 			setCandidates((prev) =>
// // 				prev.map((c) =>
// // 					c.id === draggableId ? { ...c, stage: destination.droppableId } : c
// // 				)
// // 			);
// // 		}
// // 	};

// // 	return (
// // 		<div className="candidates-page">
// // 			<h2>Candidates</h2>

// // 			<div className="filters">
// // 				<input
// // 					type="text"
// // 					placeholder="Search by name/email..."
// // 					value={search}
// // 					onChange={(e) => setSearch(e.target.value)}
// // 				/>
// // 				<select
// // 					value={stageFilter}
// // 					onChange={(e) => setStageFilter(e.target.value)}>
// // 					<option value="">All Stages</option>
// // 					{stages.map((s) => (
// // 						<option
// // 							key={s}
// // 							value={s}>
// // 							{s}
// // 						</option>
// // 					))}
// // 				</select>
// // 			</div>

// // 			{loading ? (
// // 				<p>Loading...</p>
// // 			) : (
// // 				<DragDropContext onDragEnd={handleDragEnd}>
// // 					<div className="kanban-board">
// // 						{visibleStages.map((stage) => (
// // 							<Droppable
// // 								droppableId={stage}
// // 								key={stage}>
// // 								{(provided) => (
// // 									<div
// // 										className="kanban-column"
// // 										ref={provided.innerRef}
// // 										{...provided.droppableProps}>
// // 										<h3>{stage.toUpperCase()}</h3>
// // 										{filteredCandidates
// // 											.filter((c) => c.stage === stage)
// // 											.map((candidate, index) => (
// // 												<Draggable
// // 													key={candidate.id}
// // 													draggableId={candidate.id}
// // 													index={index}>
// // 													{(provided) => (
// // 														<div
// // 															className="candidate-card"
// // 															ref={provided.innerRef}
// // 															{...provided.draggableProps}
// // 															{...provided.dragHandleProps}>
// // 															<Link to={`/candidates/${candidate.id}`}>
// // 																<strong>{candidate.name}</strong>
// // 															</Link>
// // 															<p>{candidate.email}</p>
// // 															<p>Notes: {candidate.notes.length}</p>
// // 														</div>
// // 													)}
// // 												</Draggable>
// // 											))}
// // 										{provided.placeholder}
// // 									</div>
// // 								)}
// // 							</Droppable>
// // 						))}
// // 					</div>
// // 				</DragDropContext>
// // 			)}
// // 		</div>
// // 	);
// // }

// import React, { useEffect, useState } from "react";
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// import CandidateCard from "../components/candidates/CandidateCard"; // Use your existing CandidateCard
// import "./CandidatesPage.css";

// export default function CandidatesPage() {
// 	const [candidates, setCandidates] = useState([]);
// 	const [loading, setLoading] = useState(true);
// 	const [search, setSearch] = useState("");
// 	const [stageFilter, setStageFilter] = useState("");

// 	const stages = ["applied", "screen", "tech", "offer", "hired", "rejected"];

// 	useEffect(() => {
// 		async function fetchCandidates() {
// 			setLoading(true);
// 			const res = await fetch("/api/candidates");
// 			const data = await res.json();
// 			setCandidates(data.candidates || []);
// 			setLoading(false);
// 		}
// 		fetchCandidates();
// 	}, []);

// 	// Filter candidates by name/email and stage
// 	const filteredCandidates = candidates
// 		.filter(
// 			(c) =>
// 				c.name.toLowerCase().includes(search.toLowerCase()) ||
// 				c.email.toLowerCase().includes(search.toLowerCase())
// 		)
// 		.filter((c) => (stageFilter ? c.stage === stageFilter : true));

// 	// Decide which stages to render
// 	const visibleStages = stageFilter ? [stageFilter] : stages;

// 	// Drag-and-drop handler
// 	const handleDragEnd = (result) => {
// 		if (!result.destination) return;
// 		const { source, destination, draggableId } = result;

// 		if (source.droppableId !== destination.droppableId) {
// 			setCandidates((prev) =>
// 				prev.map((c) =>
// 					c.id === draggableId ? { ...c, stage: destination.droppableId } : c
// 				)
// 			);
// 		}
// 	};

// 	return (
// 		<div className="candidates-page">
// 			<h2>Candidates</h2>

// 			<div className="filters">
// 				<input
// 					type="text"
// 					placeholder="Search by name/email..."
// 					value={search}
// 					onChange={(e) => setSearch(e.target.value)}
// 				/>
// 				<select
// 					value={stageFilter}
// 					onChange={(e) => setStageFilter(e.target.value)}>
// 					<option value="">All Stages</option>
// 					{stages.map((s) => (
// 						<option
// 							key={s}
// 							value={s}>
// 							{s}
// 						</option>
// 					))}
// 				</select>
// 			</div>

// 			{loading ? (
// 				<p>Loading...</p>
// 			) : (
// 				<DragDropContext onDragEnd={handleDragEnd}>
// 					<div className="kanban-board">
// 						{visibleStages.map((stage) => (
// 							<Droppable
// 								droppableId={stage}
// 								key={stage}>
// 								{(provided) => (
// 									<div
// 										className="kanban-column"
// 										ref={provided.innerRef}
// 										{...provided.droppableProps}>
// 										<h3>{stage.toUpperCase()}</h3>
// 										{filteredCandidates
// 											.filter((c) => c.stage === stage)
// 											.map((candidate, index) => (
// 												<Draggable
// 													key={candidate.id}
// 													draggableId={candidate.id}
// 													index={index}>
// 													{(provided) => (
// 														<div
// 															ref={provided.innerRef}
// 															{...provided.draggableProps}
// 															{...provided.dragHandleProps}>
// 															{/* Use your CandidateCard component */}
// 															<CandidateCard candidate={candidate} />
// 														</div>
// 													)}
// 												</Draggable>
// 											))}
// 										{provided.placeholder}
// 									</div>
// 								)}
// 							</Droppable>
// 						))}
// 					</div>
// 				</DragDropContext>
// 			)}
// 		</div>
// 	);
// }

import React, { useEffect, useState } from "react";
import CandidatesKanban from "../components/candidates/CandidatesKanban";
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
