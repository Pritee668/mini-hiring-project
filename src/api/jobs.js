// // src/api/jobs.js
// import { Response } from "miragejs";

// export const jobRoutes = (server) => {
// 	// GET /jobs
// 	server.get("/jobs", (schema) => {
// 		return schema.jobs.all();
// 	});

// 	// POST /jobs
// 	server.post("/jobs", (schema, request) => {
// 		const attrs = JSON.parse(request.requestBody);
// 		return schema.jobs.create(attrs);
// 	});

// 	// PATCH /jobs/:id
// 	server.patch("/jobs/:id", (schema, request) => {
// 		const id = request.params.id;
// 		const attrs = JSON.parse(request.requestBody);
// 		return schema.jobs.find(id).update(attrs);
// 	});

// 	// DELETE /jobs/:id
// 	server.delete("/jobs/:id", (schema, request) => {
// 		const id = request.params.id;
// 		schema.jobs.find(id).destroy();
// 		return new Response(200);
// 	});
// };

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
};
