import { ArrowDown, ArrowLeftRight, ArrowRight, FileCheck2, MessagesSquare, Search, ShieldCheck, SlidersHorizontal, ThumbsUp, UserRound, Waypoints } from "lucide-react";
import { projects } from "@/data/projects";

type ProjectVisualProps = {
  project: (typeof projects)[number];
  wide?: boolean;
};

/** A diagram of existing product logic, rather than a simulated screenshot. */
export function ProjectVisual({ project, wide = false }: ProjectVisualProps) {
  const isFlexitaf = project.slug === "flexitaf";
  const isSyntra = project.visual.kind === "realtime";

  return (
    <div className={`project-visual ${wide ? "project-visual-wide" : ""}`} data-project={project.slug}>
      <div className="visual-caption"><span className="eyebrow">{project.visual.caption}</span><span className="visual-cross" aria-hidden="true">+</span></div>
      <div className="visual-brand" aria-hidden="true">{isFlexitaf ? <>flexitaf<span>.</span></> : isSyntra ? <>syntra<span>.</span></> : <>serie<span>match</span></>}</div>
      {isFlexitaf ? (
        <div className="workflow-diagram" aria-label="Role-based onboarding, document validation and administrative review">
          <div><UserRound /><span>Onboarding</span><span className="diagram-detail">User roles</span></div>
          <ArrowRight className="diagram-arrow" aria-hidden="true" />
          <div><FileCheck2 /><span>Documents</span><span className="diagram-detail">Secure validation</span></div>
          <ArrowRight className="diagram-arrow" aria-hidden="true" />
          <div><ShieldCheck /><span>Review</span><span className="diagram-detail">Admin decisions</span></div>
        </div>
      ) : isSyntra ? (
        <div className="workflow-diagram" aria-label="Socket.IO over WebSocket connects conversations, real-time events and authorized private audiences">
          <div><MessagesSquare /><span>Conversations</span><span className="diagram-detail">Next.js client</span></div>
          <ArrowLeftRight className="diagram-arrow" aria-hidden="true" />
          <div><Waypoints /><span>Live events</span><span className="diagram-detail">Socket.IO / WS</span></div>
          <ArrowLeftRight className="diagram-arrow" aria-hidden="true" />
          <div><ShieldCheck /><span>Private rooms</span><span className="diagram-detail">Verified access</span></div>
        </div>
      ) : (
        <div className="discovery-diagram" aria-label="Preferences, catalogue search and personal ratings inform scoring-based recommendations">
          <div className="discovery-inputs"><span><SlidersHorizontal />Preferences</span><span><Search />Catalogue</span><span><ThumbsUp />Ratings</span></div>
          <div className="discovery-connector" aria-hidden="true"><ArrowDown /></div>
          <div className="discovery-output"><span className="eyebrow">Scoring algorithm</span><span>Find your next series<ArrowUpRightSymbol /></span></div>
        </div>
      )}
      <div className="visual-footer"><span>{project.visual.stackNote}</span><span>Product logic <span aria-hidden="true">↗</span></span></div>
    </div>
  );
}

function ArrowUpRightSymbol() {
  return <span aria-hidden="true">↗</span>;
}
