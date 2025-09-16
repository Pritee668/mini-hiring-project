// // src/api/candidates.js

// export const candidateRoutes = (server) => {
// 	// GET /candidates
// 	server.get("/candidates", (schema) => {
// 		return schema.candidates.all();
// 	});

// 	// GET /candidates/:id
// 	server.get("/candidates/:id", (schema, request) => {
// 		return schema.candidates.find(request.params.id);
// 	});

// 	// PATCH /candidates/:id
// 	server.patch("/candidates/:id", (schema, request) => {
// 		const attrs = JSON.parse(request.requestBody);
// 		return schema.candidates.find(request.params.id).update(attrs);
// 	});
// };

import { Response } from "miragejs";

export const candidateRoutes = (server, withLatencyAndErrors) => {
	// GET /candidates
	server.get(
		"/candidates",
		withLatencyAndErrors((schema) => {
			return schema.candidates.all();
		})
	);

	// GET /candidates/:id
	server.get(
		"/candidates/:id",
		withLatencyAndErrors((schema, request) => {
			const candidate = schema.candidates.find(request.params.id);
			if (!candidate)
				return new Response(404, {}, { error: "Candidate not found" });
			return candidate;
		})
	);

	// PATCH /candidates/:id
	server.patch(
		"/candidates/:id",
		withLatencyAndErrors((schema, request) => {
			const candidate = schema.candidates.find(request.params.id);
			if (!candidate)
				return new Response(404, {}, { error: "Candidate not found" });

			const attrs = JSON.parse(request.requestBody);
			return candidate.update(attrs);
		})
	);
};
