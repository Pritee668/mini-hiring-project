import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import JobCard from "./JobCard";

export default function JobsBoard({ jobs, setJobs }) {
	const handleDragEnd = async (result) => {
		if (!result.destination) return;

		const prevJobs = [...jobs];
		const reordered = Array.from(jobs);
		const [moved] = reordered.splice(result.source.index, 1);
		reordered.splice(result.destination.index, 0, moved);

		setJobs(reordered);

		try {
			const res = await fetch("/api/jobs/reorder", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(reordered),
			});

			if (!res.ok) throw new Error("Reorder failed");
			const updated = await res.json();
			setJobs(updated);
		} catch (err) {
			console.error(err);
			setJobs(prevJobs);
		}
	};

	// 🔹 Update a job in state
	const handleUpdateJob = (updatedJob) => {
		setJobs((prev) =>
			prev.map((j) => (j.id === updatedJob.id ? updatedJob : j))
		);
	};

	// 🔹 Delete a job in state + API
	const handleDeleteJob = async (jobId) => {
		if (!window.confirm("Are you sure you want to delete this job?")) return;
		try {
			await fetch(`/api/jobs/${jobId}`, { method: "DELETE" });
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
						{...provided.droppableProps}
						ref={provided.innerRef}
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
