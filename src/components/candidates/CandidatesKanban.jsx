import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import CandidateCard from "./CandidateCard";
import "./CandidatesKanban.css";

const stages = ["applied", "screen", "tech", "offer", "hired", "rejected"];

export default function CandidatesKanban({
	candidates,
	setCandidates,
	stageFilter,
}) {
	const handleDragEnd = (result) => {
		if (!result.destination) return;

		const { source, destination, draggableId } = result;

		if (source.droppableId !== destination.droppableId) {
			setCandidates((prev) =>
				prev.map((c) =>
					c.id.toString() === draggableId
						? { ...c, stage: destination.droppableId }
						: c
				)
			);
		}
	};

	// Filter stages to only show ones with candidates
	const visibleStages = stageFilter
		? stages.filter(
				(stage) =>
					stage === stageFilter && candidates.some((c) => c.stage === stage)
		  )
		: stages.filter((stage) => candidates.some((c) => c.stage === stage));

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<div className="kanban-board">
				{visibleStages.map((stage) => {
					const stageCandidates = candidates.filter((c) => c.stage === stage);

					return (
						<Droppable
							droppableId={stage}
							key={stage}>
							{(provided) => (
								<div
									className="kanban-column"
									ref={provided.innerRef}
									{...provided.droppableProps}>
									<h3>{stage.toUpperCase()}</h3>
									{stageCandidates.map((candidate, index) => (
										<Draggable
											key={candidate.id}
											draggableId={candidate.id.toString()}
											index={index}>
											{(provided) => (
												<div
													ref={provided.innerRef}
													{...provided.draggableProps}
													{...provided.dragHandleProps}>
													<CandidateCard candidate={candidate} />
												</div>
											)}
										</Draggable>
									))}
									{provided.placeholder}
								</div>
							)}
						</Droppable>
					);
				})}
			</div>
		</DragDropContext>
	);
}
