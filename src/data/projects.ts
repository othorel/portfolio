export type Project = {
  title: string;
  slug: string;
  category: string;
  caseLabel: string;
  description: string;
  /** Set only when the product is publicly accessible. */
  href?: string;
  status: "In progress" | "Live";
  tags: readonly string[];
  highlights: readonly string[];
  context: string;
  architecture: string;
  architectureLayers: readonly {
    label: string;
    technology: string;
    detail?: string;
  }[];
  architectureServices?: readonly string[];
  challenges: string;
  outcome: string;
  decisions: readonly string[];
  features: readonly string[];
  visual: {
    kind: "workflow" | "realtime" | "discovery";
    caption: string;
    stackNote: string;
  };
};

export const projects: readonly Project[] = [
  {
    title: "Flexitaf",
    slug: "flexitaf",
    category: "Recruitment SaaS",
    caseLabel: "Recruitment & mission management",
    description:
      "A recruitment and mission management SaaS focused on onboarding, mission workflows, document validation, hiring processes and administrative automation.",
    status: "In progress",
    tags: ["Next.js", "NestJS", "TypeScript", "Zod", "Prisma", "PostgreSQL", "Meilisearch", "S3", "Better Auth"],
    highlights: ["Role-based onboarding", "Mission workflows", "Candidate matching & hiring", "Document validation", "Contract & administrative processes"],
    context:
      "Flexitaf is a recruitment and mission management platform designed around complex hiring workflows. The challenge is to keep candidate, recruiter and administrative processes consistent while handling onboarding, mission publication, applications, hiring decisions, documents and employment formalities.",
    architecture:
      "Next.js provides the web interface, with a NestJS API and Prisma/PostgreSQL for persistence. Shared TypeScript contracts and Zod validation keep the interface and API aligned. Meilisearch supports search and candidate matching, S3 handles document storage, and Better Auth manages authentication.",
    architectureLayers: [
      { label: "Web", technology: "Next.js" },
      { label: "Shared contracts", technology: "TypeScript", detail: "Zod validation" },
      { label: "API", technology: "NestJS" },
      { label: "Data", technology: "Prisma", detail: "PostgreSQL" },
    ],
    architectureServices: ["Meilisearch", "S3 / document storage", "Better Auth"],
    challenges:
      "The difficulty lies in keeping dependent business states consistent. Missions, applications, hiring confirmations, contracts, DPAE declarations, documents and cancellations affect one another. Each action must respect the current state of the whole workflow, preventing invalid transitions or conflicting hiring decisions.",
    outcome:
      "Flexitaf is still in active development. The current architecture provides a shared foundation for mission management, recruitment workflows, document handling and employment formalities while keeping business rules consistent across the product.",
    decisions: [
      "Share TypeScript contracts and Zod validation so frontend and backend apply consistent business rules.",
      "Represent mission, application and contract workflows with explicit domain states and controlled transitions.",
      "Use role-based onboarding and separate candidate, recruiter and administrative responsibilities.",
      "Protect hiring confirmations with locks and state checks to prevent conflicting decisions.",
      "Keep document validation, contract processes and DPAE employment declarations connected to the recruitment workflow.",
    ],
    features: [
      "Role-based onboarding for candidates and recruiters",
      "Mission creation, publication and application workflows",
      "Candidate matching and hiring confirmation flows",
      "Secure document upload and validation",
      "Contract and DPAE workflows",
      "Shared business rules across frontend and backend",
    ],
    visual: { kind: "workflow", caption: "Workflow / Recruitment", stackNote: "Next.js / NestJS / PostgreSQL" },
  },
  {
    title: "Syntra",
    slug: "syntra",
    category: "Real-time communities",
    caseLabel: "Communities & real-time messaging",
    description:
      "A full-stack community and messaging application with live conversations, presence and typing indicators, powered by Socket.IO over WebSocket.",
    status: "In progress",
    tags: ["Next.js", "NestJS", "Socket.IO", "WebSocket", "Prisma", "PostgreSQL", "Better Auth", "TypeScript", "Zod"],
    highlights: ["Real-time messaging", "Presence & typing", "Authenticated private rooms"],
    context:
      "Syntra brings communities, channels and private conversations into one application. The challenge is to deliver live updates to the right people while keeping message history, membership permissions and authentication consistent across HTTP requests and long-lived WebSocket connections.",
    architecture:
      "A pnpm/Turborepo monorepo connects a Next.js frontend to a NestJS API and Socket.IO gateway. The client uses WebSocket transport with session cookies. Prisma and PostgreSQL persist messages, memberships and conversations, while Better Auth verifies sessions. A shared package provides TypeScript event payloads and Zod validation for API inputs. Presence and connection tracking currently live in memory within a single API instance.",
    architectureLayers: [
      { label: "Interface", technology: "Next.js", detail: "Socket.IO client" },
      { label: "API & realtime", technology: "NestJS", detail: "Socket.IO gateway" },
      { label: "Persistence", technology: "Prisma", detail: "PostgreSQL" },
    ],
    architectureServices: ["Socket.IO / WebSocket", "Better Auth sessions", "Shared TypeScript / Zod"],
    challenges:
      "Real-time access can change while a connection is still open. Syntra must handle multiple connections per user, revoked sessions, membership changes and disconnects without exposing private events or marking an active user offline. Persisted message changes and live updates also need to stay aligned across channels and direct conversations.",
    outcome:
      "Syntra combines communities, private messaging, message editing, replies, reactions, unread tracking and live presence in a full-stack application. Its current real-time implementation uses authenticated sessions and membership-aware event delivery on a single API instance.",
    decisions: [
      "Persist message changes through the HTTP API before publishing Socket.IO events to authorized recipients.",
      "Authenticate the WebSocket handshake with Better Auth session cookies, then revalidate identity on incoming events.",
      "Check community membership and conversation participation before joining private rooms or sending typing events.",
      "Disconnect sockets when their session is revoked and remove room access when membership changes.",
      "Count active connections per user so presence remains accurate across multiple tabs and disconnects.",
      "Share TypeScript payloads and Zod API validation; keep the current gateway and presence state within one API instance.",
    ],
    features: [
      "Communities, channels, categories and role-based administration",
      "Channel messaging and private conversations with live updates",
      "Message editing, deletion, replies, mentions and reactions",
      "Live presence and typing indicators",
      "Unread counters and in-app reaction notifications",
      "Verified-email authentication and membership-aware real-time access",
    ],
    visual: { kind: "realtime", caption: "Realtime / Communities", stackNote: "Socket.IO / WebSocket / Better Auth" },
  },
  {
    title: "SerieMatch",
    slug: "serieMatch",
    category: "Series discovery",
    caseLabel: "Series discovery & recommendations",
    description:
      "A fullstack series discovery app that helps users find recommendations based on their tastes, platforms, viewing mood and personal preferences.",
    href: "https://seriematch.othorel.fr",
    status: "Live",
    tags: ["Next.js", "NestJS", "Prisma", "PostgreSQL", "Meilisearch", "TMDB API", "TypeScript", "Zod", "Tailwind CSS", "shadcn/ui"],
    highlights: ["Account creation and authentication", "Preference questionnaire based on tastes, platforms and viewing mood"],
    context:
      "SerieMatch was built as a product-focused fullstack project to make series discovery more personal than a basic catalogue. Users can create an account, complete a preference questionnaire, browse a searchable catalogue and build a personal library around what they want to watch, have already seen or are not interested in.",
    architecture:
      "The application uses Next.js for the frontend, NestJS for the API, Prisma with PostgreSQL for persistence, Meilisearch for catalogue search, and the TMDB API to enrich series data. Shared TypeScript and Zod schemas keep validation and data contracts consistent across the stack.",
    architectureLayers: [
      { label: "Interface", technology: "Next.js" },
      { label: "API", technology: "NestJS" },
      { label: "Persistence", technology: "Prisma", detail: "PostgreSQL" },
    ],
    challenges:
      "The main challenge was combining tastes, platforms, moods, genres and user ratings into a recommendation score that remains explainable and easy to tune.",
    outcome:
      "SerieMatch combines authentication, preference onboarding, catalogue search, personal library management and explainable recommendations in a single full-stack application.",
    decisions: [
      "Use a deterministic scoring model to keep recommendations explainable, predictable and easy to iterate on.",
      "Use thumbs-based ratings to increase or decrease recommendation scores based on user feedback.",
      "Use Meilisearch to provide fast catalogue search and filtering by genre, mood and platform.",
      "Use the TMDB API to import and enrich series data with metadata, posters and popularity signals.",
      "Share TypeScript and Zod schemas between frontend and backend to keep API contracts and validation consistent.",
    ],
    features: [
      "Account creation and authentication",
      "Preference questionnaire based on tastes, platforms and viewing mood",
      "Searchable series catalogue powered by Meilisearch",
      "Personal library with to-watch, watched and not-interested statuses",
      "Scoring-based recommendation system influenced by user ratings",
    ],
    visual: { kind: "discovery", caption: "Discovery / Recommendations", stackNote: "Meilisearch / TMDB / Zod" },
  },
];
