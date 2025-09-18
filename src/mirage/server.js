// import { createServer, Model, Factory, Response } from "miragejs";
// import Dexie from "dexie";
// import { jobRoutes } from "../services/jobs";
// import { candidateRoutes } from "../services/candidates";
// import { assessmentRoutes } from "../services/assessments";

// // Dexie DB setup
// export const db = new Dexie("AssessmentAppDB");
// db.version(1).stores({
// 	jobs: "++id, title, slug, status",
// 	candidates: "++id, name, email, stage",
// 	assessments: "++id, jobId, sections",
// });

// function withLatencyAndErrors(handler) {
// 	return (schema, request) => {
// 		return new Promise((resolve) => {
// 			const delay = Math.floor(Math.random() * 1000) + 200; // 200–1200ms
// 			setTimeout(() => {
// 				// 5–10% error rate for write requests
// 				if (
// 					["post", "put", "patch", "delete"].includes(
// 						request.method.toLowerCase()
// 					) &&
// 					Math.random() < 0.1
// 				) {
// 					resolve(new Response(500, {}, { error: "Random server error" }));
// 				} else {
// 					resolve(handler(schema, request));
// 				}
// 			}, delay);
// 		});
// 	};
// }

// export function makeServer({ environment = "development" } = {}) {
// 	return createServer({
// 		environment,

// 		models: {
// 			job: Model,
// 			candidate: Model,
// 			assessment: Model,
// 			response: Model,
// 		},

// 		factories: {
// 			job: Factory.extend({
// 				title(i) {
// 					const titles = [
// 						"Frontend Developer",
// 						"React Engineer",
// 						"Backend Developer",
// 						"Fullstack Developer",
// 						"UI/UX Designer",
// 					];
// 					return titles[i % titles.length];
// 				},
// 				slug(i) {
// 					return `job-${i + 1}`;
// 				},
// 				status() {
// 					return Math.random() > 0.3 ? "active" : "archived";
// 				},
// 				tags() {
// 					const possibleTags = ["React", "Frontend", "Backend", "Remote"];
// 					return [
// 						possibleTags[Math.floor(Math.random() * possibleTags.length)],
// 					];
// 				},
// 				order(i) {
// 					return i;
// 				},
// 				description() {
// 					return "This is a detailed job description for HR team.";
// 				},
// 				location() {
// 					const loc = ["Remote", "New York", "London", "Bangalore"];
// 					return loc[Math.floor(Math.random() * loc.length)];
// 				},
// 				applicants() {
// 					return Math.floor(Math.random() * 100);
// 				},
// 			}),

// 			candidate: Factory.extend({
// 				name(i) {
// 					const firstNames = [
// 						"Alice",
// 						"Bob",
// 						"Charlie",
// 						"David",
// 						"Eva",
// 						"Frank",
// 						"Grace",
// 						"Hannah",
// 					];
// 					const lastNames = [
// 						"Smith",
// 						"Johnson",
// 						"Brown",
// 						"Lee",
// 						"Williams",
// 						"Jones",
// 					];
// 					return `${firstNames[i % firstNames.length]} ${
// 						lastNames[i % lastNames.length]
// 					}`;
// 				},
// 				email(i) {
// 					return `candidate${i + 1}@example.com`;
// 				},
// 				stage() {
// 					const stages = [
// 						"applied",
// 						"screen",
// 						"tech",
// 						"offer",
// 						"hired",
// 						"rejected",
// 					];
// 					return stages[Math.floor(Math.random() * stages.length)];
// 				},
// 				timeline() {
// 					const stages = [
// 						"applied",
// 						"screen",
// 						"tech",
// 						"offer",
// 						"hired",
// 						"rejected",
// 					];
// 					const finalStageIndex = Math.floor(Math.random() * stages.length);
// 					const today = Date.now();

// 					return stages.slice(0, finalStageIndex + 1).map((stage, i, arr) => ({
// 						stage,
// 						date: new Date(
// 							today - (arr.length - 1 - i) * 1000 * 60 * 60 * 24
// 						).toISOString(),
// 					}));
// 				},
// 				notes() {
// 					return [
// 						{
// 							text: "Initial screening completed. @HR",
// 							date: new Date(
// 								Date.now() - Math.random() * 1000000000
// 							).toISOString(),
// 							author: "HR",
// 						},
// 					];
// 				},
// 			}),
// 		},

// 		seeds(server) {
// 			// Load persisted data if available
// 			db.jobs.toArray().then((jobs) => {
// 				if (jobs.length === 0) {
// 					// Only seed if DB is empty
// 					server.createList("job", 25);
// 					server.createList("candidate", 1000);

// 					[1, 2, 3].forEach((id) => {
// 						server.create("assessment", {
// 							jobId: String(id),
// 							sections: [
// 								{
// 									title: "General Knowledge",
// 									questions: [
// 										{
// 											id: `q1-${id}`,
// 											type: "single-choice",
// 											text: "Do you have React experience?",
// 											options: ["Yes", "No"],
// 											required: true,
// 											showIf: null,
// 											maxLength: null,
// 											range: null,
// 										},
// 										{
// 											id: `q2-${id}`,
// 											type: "short-text",
// 											text: "Explain your latest project",
// 											required: false,
// 											maxLength: 200,
// 											showIf: { questionId: `q1-${id}`, value: "Yes" },
// 											range: null,
// 										},
// 										{
// 											id: `q3-${id}`,
// 											type: "numeric",
// 											text: "Years of coding experience?",
// 											required: true,
// 											range: { min: 0, max: 20 },
// 											showIf: null,
// 											maxLength: null,
// 										},
// 									],
// 								},
// 							],
// 						});
// 					});

// 					// Persist seed into IndexedDB
// 					db.jobs.bulkAdd(server.db.jobs);
// 					db.candidates.bulkAdd(server.db.candidates);
// 					db.assessments.bulkAdd(server.db.assessments);
// 				} else {
// 					// Restore Mirage state from IndexedDB
// 					jobs.forEach((job) => server.create("job", job));
// 					db.candidates
// 						.toArray()
// 						.then((cands) =>
// 							cands.forEach((c) => server.create("candidate", c))
// 						);
// 					db.assessments
// 						.toArray()
// 						.then((assessments) =>
// 							assessments.forEach((a) => server.create("assessment", a))
// 						);
// 				}
// 			});
// 		},

// 		routes() {
// 			this.namespace = "api";

// 			// Wrap routes with latency + error injection
// 			jobRoutes(this, withLatencyAndErrors);
// 			candidateRoutes(this, withLatencyAndErrors);
// 			assessmentRoutes(this, withLatencyAndErrors);
// 		},
// 	});
// }
import { createServer, Model, Factory, Response } from "miragejs";
import Dexie from "dexie";
import { jobRoutes } from "../services/jobs";
import { candidateRoutes } from "../services/candidates";
import { assessmentRoutes } from "../services/assessments";

// Dexie DB setup
export const db = new Dexie("AssessmentAppDB");
db.version(1).stores({
	jobs: "++id, title, slug, status",
	candidates: "++id, name, email, stage, referredBy",
	assessments: "++id, jobId, sections",
});

function withLatencyAndErrors(handler) {
	return (schema, request) => {
		return new Promise((resolve) => {
			const delay = Math.floor(Math.random() * 1000) + 200; // 200–1200ms
			setTimeout(() => {
				// 10% error rate for write requests
				if (
					["post", "put", "patch", "delete"].includes(
						request.method.toLowerCase()
					) &&
					Math.random() < 0.1
				) {
					resolve(new Response(500, {}, { error: "Random server error" }));
				} else {
					resolve(handler(schema, request));
				}
			}, delay);
		});
	};
}

export function makeServer({ environment = "development" } = {}) {
	return createServer({
		environment,

		models: {
			job: Model,
			candidate: Model,
			assessment: Model,
			response: Model,
		},

		factories: {
			job: Factory.extend({
				title(i) {
					const titles = [
						"Frontend Developer",
						"React Engineer",
						"Backend Developer",
						"Fullstack Developer",
						"UI/UX Designer",
					];
					return titles[i % titles.length];
				},
				slug(i) {
					return `job-${i + 1}`;
				},
				status() {
					return Math.random() > 0.3 ? "active" : "archived";
				},
				tags() {
					const possibleTags = ["React", "Frontend", "Backend", "Remote"];
					return [
						possibleTags[Math.floor(Math.random() * possibleTags.length)],
					];
				},
				order(i) {
					return i;
				},
				description() {
					return "This is a detailed job description for HR team.";
				},
				location() {
					const loc = ["Remote", "New York", "London", "Bangalore"];
					return loc[Math.floor(Math.random() * loc.length)];
				},
				applicants() {
					return Math.floor(Math.random() * 100);
				},
			}),

			candidate: Factory.extend({
				name(i) {
					const firstNames = [
						"Alice",
						"Bob",
						"Charlie",
						"David",
						"Eva",
						"Frank",
						"Grace",
						"Hannah",
					];
					const lastNames = [
						"Smith",
						"Johnson",
						"Brown",
						"Lee",
						"Williams",
						"Jones",
					];
					return `${firstNames[i % firstNames.length]} ${
						lastNames[i % lastNames.length]
					}`;
				},
				email(i) {
					return `candidate${i + 1}@example.com`;
				},
				stage() {
					const stages = [
						"applied",
						"screen",
						"tech",
						"offer",
						"hired",
						"rejected",
					];
					return stages[Math.floor(Math.random() * stages.length)];
				},
				referredBy() {
					const referrers = [
						"John Doe",
						"Priya Gupta",
						"Michael Lee",
						"Sarah Johnson",
						"Rajesh Kumar",
					];
					// 40% chance to have a referrer
					return Math.random() < 0.4
						? referrers[Math.floor(Math.random() * referrers.length)]
						: null;
				},
				timeline() {
					const stages = [
						"applied",
						"screen",
						"tech",
						"offer",
						"hired",
						"rejected",
					];
					const finalStageIndex = Math.floor(Math.random() * stages.length);
					const today = Date.now();

					return stages.slice(0, finalStageIndex + 1).map((stage, i, arr) => ({
						stage,
						date: new Date(
							today - (arr.length - 1 - i) * 1000 * 60 * 60 * 24
						).toISOString(),
					}));
				},
				notes() {
					return [
						{
							text: "Initial screening completed. @HR",
							date: new Date(
								Date.now() - Math.random() * 1000000000
							).toISOString(),
							author: "HR",
						},
					];
				},
			}),
		},

		seeds(server) {
			// Load persisted data if available
			db.jobs.toArray().then((jobs) => {
				if (jobs.length === 0) {
					// Only seed if DB is empty
					server.createList("job", 25);
					server.createList("candidate", 1000);

					[1, 2, 3].forEach((id) => {
						server.create("assessment", {
							jobId: String(id),
							sections: [
								{
									title: "General Knowledge",
									questions: [
										{
											id: `q1-${id}`,
											type: "single-choice",
											text: "Do you have React experience?",
											options: ["Yes", "No"],
											required: true,
										},
										{
											id: `q2-${id}`,
											type: "short-text",
											text: "Explain your latest project",
											required: false,
											maxLength: 200,
											showIf: { questionId: `q1-${id}`, value: "Yes" },
										},
										{
											id: `q3-${id}`,
											type: "numeric",
											text: "Years of coding experience?",
											required: true,
											range: { min: 0, max: 20 },
										},
									],
								},
							],
						});
					});

					// Persist seed into IndexedDB
					db.jobs.bulkAdd(server.db.jobs);
					db.candidates.bulkAdd(server.db.candidates);
					db.assessments.bulkAdd(server.db.assessments);
				} else {
					// Restore Mirage state from IndexedDB
					jobs.forEach((job) => server.create("job", job));
					db.candidates
						.toArray()
						.then((cands) =>
							cands.forEach((c) => server.create("candidate", c))
						);
					db.assessments
						.toArray()
						.then((assessments) =>
							assessments.forEach((a) => server.create("assessment", a))
						);
				}
			});
		},

		routes() {
			this.namespace = "api";

			// Wrap routes with latency + error injection
			jobRoutes(this, withLatencyAndErrors);
			candidateRoutes(this, withLatencyAndErrors);
			assessmentRoutes(this, withLatencyAndErrors);
		},
	});
}
