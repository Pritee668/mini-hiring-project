import { Response } from "miragejs";

export const jobRoutes = (server, withLatencyAndErrors) => {
	// GET /jobs
	server.get(
		"/jobs",
		withLatencyAndErrors((schema) => {
			return schema.jobs.all();
		})
	);

	// POST /jobs
	server.post(
		"/jobs",
		withLatencyAndErrors((schema, request) => {
			const attrs = JSON.parse(request.requestBody);
			return schema.jobs.create(attrs);
		})
	);

	// PATCH /jobs/:id
	server.patch(
		"/jobs/:id",
		withLatencyAndErrors((schema, request) => {
			const job = schema.jobs.find(request.params.id);
			if (!job) return new Response(404, {}, { error: "Job not found" });

			const attrs = JSON.parse(request.requestBody);
			return job.update(attrs);
		})
	);

	// DELETE /jobs/:id
	server.delete(
		"/jobs/:id",
		withLatencyAndErrors((schema, request) => {
			const job = schema.jobs.find(request.params.id);
			if (!job) return new Response(404, {}, { error: "Job not found" });

			job.destroy();
			return new Response(200);
		})
	);

	// PATCH /jobs/reorder (new API for drag-and-drop persistence)
	server.patch(
		"/jobs/reorder",
		withLatencyAndErrors((schema, request) => {
			const reorderedJobs = JSON.parse(request.requestBody);

			reorderedJobs.forEach((job, index) => {
				let jobModel = schema.jobs.find(job.id);
				if (jobModel) {
					jobModel.update({ order: index });
				}
			});

			// Return jobs sorted by new order
			return schema.jobs.all().models.sort((a, b) => a.order - b.order);
		})
	);
};
