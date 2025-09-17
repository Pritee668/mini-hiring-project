import React, { useEffect, useState } from "react";
import JobsBoard from "../../components/jobs/JobsBoard";
import JobForm from "../../components/jobs/JobForm";
import "./JobsPage.css";

export default function JobsPage() {
	const [jobs, setJobs] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Filters and pagination
	const [searchTitle, setSearchTitle] = useState("");
	const [statusFilter, setStatusFilter] = useState("");
	const [tagFilter, setTagFilter] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 5;

	useEffect(() => {
		async function fetchJobs() {
			setLoading(true);
			try {
				const res = await fetch("api/jobs");
				const data = await res.json();
				setJobs(data.jobs.sort((a, b) => a.order - b.order));
			} catch (err) {
				console.error("Failed to fetch jobs:", err);
			} finally {
				setLoading(false);
			}
		}
		fetchJobs();
	}, []);

	const handleJobCreated = (newJob) => {
		setJobs((prev) => [...prev, newJob].sort((a, b) => a.order - b.order));
		setIsModalOpen(false);
	};

	// Filtered jobs
	const filteredJobs = jobs
		.filter((job) =>
			job.title.toLowerCase().includes(searchTitle.trim().toLowerCase())
		)
		.filter((job) => (statusFilter ? job.status === statusFilter : true))
		.filter((job) =>
			tagFilter
				? job.tags?.some((t) =>
						t.toLowerCase().includes(tagFilter.trim().toLowerCase())
				  )
				: true
		);

	const totalPages = Math.ceil(filteredJobs.length / pageSize);
	const paginatedJobs = filteredJobs.slice(
		(currentPage - 1) * pageSize,
		currentPage * pageSize
	);

	return (
		<div className="jobs-page">
			<header className="jobs-header">
				<h2>Jobs</h2>
				<button
					className="new-job-btn"
					onClick={() => setIsModalOpen(true)}>
					+ New Job
				</button>
			</header>

			<div className="filters">
				<input
					type="text"
					placeholder="Search by title..."
					value={searchTitle}
					onChange={(e) => {
						setSearchTitle(e.target.value);
						setCurrentPage(1);
					}}
				/>
				<select
					value={statusFilter}
					onChange={(e) => {
						setStatusFilter(e.target.value);
						setCurrentPage(1);
					}}>
					<option value="">All Status</option>
					<option value="active">Active</option>
					<option value="archived">Archived</option>
				</select>
				<input
					type="text"
					placeholder="Filter by tag..."
					value={tagFilter}
					onChange={(e) => {
						setTagFilter(e.target.value);
						setCurrentPage(1);
					}}
				/>
			</div>

			{loading ? (
				<p>Loading...</p>
			) : (
				<>
					<JobsBoard
						jobs={paginatedJobs}
						setJobs={setJobs}
						pageOffset={(currentPage - 1) * pageSize}
					/>

					{/* <JobsBoard
						jobs={paginatedJobs}
						setJobs={setJobs}
					/> */}

					<div className="pagination">
						<button
							onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
							disabled={currentPage === 1}>
							Prev
						</button>
						<span>
							Page {currentPage} of {totalPages}
						</span>
						<button
							onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
							disabled={currentPage === totalPages || totalPages === 0}>
							Next
						</button>
					</div>
				</>
			)}

			{/* Modal */}
			{isModalOpen && (
				<div
					className="modal-overlay"
					onClick={() => setIsModalOpen(false)}>
					<div
						className="modal-content"
						onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
					>
						<button
							className="modal-close"
							onClick={() => setIsModalOpen(false)}>
							&times;
						</button>
						<JobForm
							onClose={() => setIsModalOpen(false)}
							onJobCreated={handleJobCreated}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
