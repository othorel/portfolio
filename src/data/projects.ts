export const projects = [
  {
    title: "Confidential SaaS Platform",
    slug: "confidential-saas-platform",
    description:
      "A production-oriented SaaS platform with role-based onboarding, secure document workflows, admin review tools and shared business rules across the stack.",
    tags: ["Next.js", "NestJS", "Prisma", "PostgreSQL", "S3"],
    context:
      "This project was built around a common SaaS problem: turning a complex onboarding and validation process into a clear product experience for multiple user roles.",
    architecture:
      "The platform uses Next.js for the user interface, NestJS for the API layer, Prisma with PostgreSQL for persistence, and shared TypeScript/Zod validation to keep frontend and backend contracts aligned.",
    challenges:
      "The hardest part was managing many business states without duplicating logic: user roles, onboarding progression, document status, admin review decisions and secure upload flows all had to stay consistent.",
    outcome:
      "The result is a maintainable fullstack foundation with typed API contracts, reusable validation, clear domain boundaries and production-ready workflow patterns.",
    decisions: [
      "Shared TypeScript and Zod schemas to keep frontend and backend validation consistent.",
      "Role-based onboarding logic designed as explicit domain states instead of scattered UI conditions.",
      "Secure document upload flow with file validation, storage status and review tracking.",
      "Admin-facing workflows separated from user-facing onboarding to keep responsibilities clear.",
    ],
    features: [
      "Role-based onboarding experience",
      "Secure document upload and validation flow",
      "Admin dashboard for review and decision workflows",
      "Shared business rules between frontend and backend",
    ],
  },
  {
    title: "Real-time Messaging Platform",
    slug: "real-time-messaging",
    description:
      "A real-time communication app with channel-based conversations, live message updates, authentication and a responsive interface inspired by modern team tools.",
    tags: ["React", "Node.js", "WebSocket", "PostgreSQL"],
    context:
      "This project explores the core mechanics of a modern messaging product: authenticated users, channels, live conversations and immediate interface feedback.",
    architecture:
      "The application is structured around a frontend client connected to a backend API, with WebSocket events used to synchronize message and channel updates in real time.",
    challenges:
      "The main challenge was keeping the interface fast and predictable while handling live updates, channel switching, user sessions and message state synchronization.",
    outcome:
      "The result is a polished fullstack application that demonstrates real-time product behavior, structured backend communication and smooth interactive UI patterns.",
    decisions: [
      "WebSocket-based event flow for instant message delivery and live interface updates.",
      "Channel-oriented data model to keep conversations structured and scalable.",
      "Authentication flow separated from messaging logic to keep the backend easier to reason about.",
      "Optimistic and responsive UI patterns to make the product feel fast during interactions.",
    ],
    features: [
      "Channel-based conversations",
      "Real-time message synchronization",
      "Authentication and user sessions",
      "Responsive messaging interface",
    ],
  },
] as const;
