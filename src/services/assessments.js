// Inside assessmentRoutes.js
export function assessmentRoutes(server, withLatencyAndErrors) {
	server.get("/assessments/:jobId", (schema, request) => {
		let jobId = request.params.jobId;
		let assessment = schema.assessments.findBy({ jobId });
		if (!assessment) {
			return new Response(404, {}, { error: "Assessment not found" });
		}
		return { assessment: assessment.attrs };
	});

	server.post("/assessments/:jobId/submit", (schema, request) => {
		let jobId = request.params.jobId;
		let attrs;

		try {
			attrs = JSON.parse(request.requestBody);
		} catch (err) {
			return new Response(400, {}, { error: "Invalid JSON" });
		}

		if (!attrs.responses || typeof attrs.responses !== "object") {
			return new Response(
				400,
				{},
				{ error: "Responses must be an object keyed by question ID" }
			);
		}

		// Ensure files are stored as filenames (if any slipped through)
		for (let key in attrs.responses) {
			if (attrs.responses[key] instanceof File) {
				attrs.responses[key] = attrs.responses[key].name;
			}
		}

		// Create a new response entry in Mirage DB
		const responseEntry = schema.responses.create({
			jobId,
			submittedAt: new Date().toISOString(),
			responses: attrs.responses,
		});

		return responseEntry.attrs;
	});
}
