import React, { useState } from "react";
import JobForm from "./JobForm";
import "./JobCard.css";

export default function JobCard({ job, onUpdateJob, onDeleteJob }) {
	const [isEditing, setIsEditing] = useState(false);

	const handleArchiveToggle = async () => {
		const updatedStatus = job.status === "active" ? "archived" : "active";
		try {
			const res = await fetch(`/api/jobs/${job.id}`, {
				method: "PATCH",
				body: JSON.stringify({ status: updatedStatus }),
			});
			const data = await res.json();
			onUpdateJob(data.job);
		} catch (err) {
			alert("Failed to update status");
		}
	};

	return (
		<div className="job-card">
			{isEditing && (
				<JobForm
					onClose={() => setIsEditing(false)}
					job={job}
					onJobUpdated={(updatedJob) => {
						onUpdateJob(updatedJob);
						setIsEditing(false);
					}}
				/>
			)}

			<h3>{job.title}</h3>
			<p>
				<strong>Status:</strong> {job.status}
			</p>
			<p>
				<strong>Location:</strong> {job.location}
			</p>
			<p>
				<strong>Applicants:</strong> {job.applicants}
			</p>
			<p>
				<strong>Tags:</strong> {job.tags?.join(", ")}
			</p>
			<p>{job.description}</p>

			<div className="job-card-buttons">
				<button
					className="edit-btn"
					onClick={() => setIsEditing(true)}>
					Edit
				</button>
				<button
					className="archive-btn"
					onClick={handleArchiveToggle}>
					{job.status === "active" ? "Archive" : "Unarchive"}
				</button>
				<button
					className="delete-btn"
					onClick={() => onDeleteJob(job.id)}>
					Delete
				</button>
			</div>
		</div>
	);
}
