import React, { useState } from "react";
import "./JobForm.css";

export default function JobForm({ onClose, onJobCreated, onJobUpdated, job }) {
	const [title, setTitle] = useState(job?.title || "");
	const [slug, setSlug] = useState(job?.slug || "");
	const [description, setDescription] = useState(job?.description || "");
	const [location, setLocation] = useState(job?.location || "");
	const [tags, setTags] = useState(job?.tags?.join(", ") || "");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!title.trim()) {
			setError("Title is required");
			return;
		}

		const payload = {
			title,
			slug,
			description,
			location,
			tags: tags.split(",").map((t) => t.trim()),
		};

		try {
			if (job) {
				const res = await fetch(`/api/jobs/${job.id}`, {
					method: "PATCH",
					body: JSON.stringify(payload),
				});
				const data = await res.json();
				onJobUpdated(data.job);
			} else {
				const res = await fetch("/api/jobs", {
					method: "POST",
					body: JSON.stringify({
						...payload,
						status: "active",
						order: Date.now(),
						applicants: 0,
					}),
				});
				const data = await res.json();
				onJobCreated(data.job);
			}
			onClose();
		} catch {
			setError("Error saving job");
		}
	};

	return (
		<div className="modal">
			<form
				onSubmit={handleSubmit}
				className="job-form">
				<h3>{job ? "Edit Job" : "Create Job"}</h3>
				{error && <p className="error">{error}</p>}

				<label>
					Title:
					<input
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</label>
				<label>
					Slug:
					<input
						value={slug}
						onChange={(e) => setSlug(e.target.value)}
					/>
				</label>
				<label>
					Description:
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</label>
				<label>
					Location:
					<input
						value={location}
						onChange={(e) => setLocation(e.target.value)}
					/>
				</label>
				<label>
					Tags (comma separated):
					<input
						value={tags}
						onChange={(e) => setTags(e.target.value)}
					/>
				</label>

				<div className="form-buttons">
					<button type="submit">{job ? "Update" : "Save"}</button>
					<button
						type="button"
						onClick={onClose}>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
}
