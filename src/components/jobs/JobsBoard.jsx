// import React from "react";
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// import JobCard from "./JobCard";

// export default function JobsBoard({ jobs, setJobs }) {
// 	const handleDragEnd = async (result) => {
// 		if (!result.destination) return;

// 		const prevJobs = [...jobs]; // rollback copy
// 		const reordered = Array.from(jobs);
// 		const [moved] = reordered.splice(result.source.index, 1);
// 		reordered.splice(result.destination.index, 0, moved);

// 		setJobs(reordered);

// 		try {
// 			const res = await fetch(`/api/jobs/${moved.id}/reorder`, {
// 				method: "PATCH",
// 				headers: { "Content-Type": "application/json" },
// 				body: JSON.stringify({
// 					fromOrder: result.source.index,
// 					toOrder: result.destination.index,
// 				}),
// 			});
// 			if (!res.ok) throw new Error("Failed to reorder");
// 		} catch {
// 			alert("Reorder failed. Rolling back!");
// 			setJobs(prevJobs);
// 		}
// 	};

// 	const handleUpdateJob = (updatedJob) => {
// 		setJobs((prev) =>
// 			prev.map((j) => (j.id === updatedJob.id ? updatedJob : j))
// 		);
// 	};

// 	const handleDeleteJob = async (jobId) => {
// 		if (!window.confirm("Are you sure to delete this job?")) return;
// 		try {
// 			await fetch(`/api/jobs/${jobId}`, { method: "DELETE" });
// 			setJobs((prev) => prev.filter((j) => j.id !== jobId));
// 		} catch {
// 			alert("Failed to delete job");
// 		}
// 	};

// 	return (
// 		<DragDropContext onDragEnd={handleDragEnd}>
// 			<Droppable droppableId="jobs">
// 				{(provided) => (
// 					<div
// 						ref={provided.innerRef}
// 						{...provided.droppableProps}
// 						className="jobs-board">
// 						{jobs.map((job, index) => (
// 							<Draggable
// 								key={job.id}
// 								draggableId={job.id.toString()}
// 								index={index}>
// 								{(provided) => (
// 									<div
// 										ref={provided.innerRef}
// 										{...provided.draggableProps}
// 										{...provided.dragHandleProps}>
// 										<JobCard
// 											job={job}
// 											onUpdateJob={handleUpdateJob}
// 											onDeleteJob={handleDeleteJob}
// 										/>
// 									</div>
// 								)}
// 							</Draggable>
// 						))}
// 						{provided.placeholder}
// 					</div>
// 				)}
// 			</Droppable>
// 		</DragDropContext>
// 	);
// }

import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import JobCard from "./JobCard";

export default function JobsBoard({ jobs, setJobs, pageOffset }) {
	const handleDragEnd = async (result) => {
		if (!result.destination) return;

		const prevJobs = [...jobs];
		const reordered = Array.from(jobs);
		const [moved] = reordered.splice(result.source.index, 1);
		reordered.splice(result.destination.index, 0, moved);

		// 🔑 Adjust to global index
		setJobs((allJobs) => {
			const newJobs = [...allJobs];
			newJobs.splice(pageOffset + result.source.index, 1);
			newJobs.splice(pageOffset + result.destination.index, 0, moved);

			return newJobs.map((j, i) => ({ ...j, order: i })); // keep global order consistent
		});

		try {
			const res = await fetch(`/jobs/${moved.id}/reorder`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					fromOrder: pageOffset + result.source.index,
					toOrder: pageOffset + result.destination.index,
				}),
			});
			if (!res.ok) throw new Error("Failed to reorder");
		} catch {
			alert("Reorder failed. Rolling back!");
			setJobs(prevJobs);
		}
	};

	const handleUpdateJob = (updatedJob) => {
		setJobs((prev) =>
			prev.map((j) => (j.id === updatedJob.id ? updatedJob : j))
		);
	};

	const handleDeleteJob = async (jobId) => {
		if (!window.confirm("Are you sure to delete this job?")) return;
		try {
			await fetch(`/jobs/${jobId}`, { method: "DELETE" });
			setJobs((prev) => prev.filter((j) => j.id !== jobId));
		} catch {
			alert("Failed to delete job");
		}
	};

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<Droppable droppableId="jobs">
				{(provided) => (
					<div
						ref={provided.innerRef}
						{...provided.droppableProps}
						className="jobs-board">
						{jobs.map((job, index) => (
							<Draggable
								key={job.id}
								draggableId={job.id.toString()}
								index={index}>
								{(provided) => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}>
										<JobCard
											job={job}
											onUpdateJob={handleUpdateJob}
											onDeleteJob={handleDeleteJob}
										/>
									</div>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
}
