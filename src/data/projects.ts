export const projects = [
  {
    title: "Confidential SaaS Platform",
    slug: "confidential-saas-platform",
    description:
      "Fullstack platform with onboarding workflows, document management, admin dashboard and complex business logic.",
    tags: ["Next.js", "NestJS", "Prisma", "PostgreSQL", "S3"],
    context:
      "A confidential SaaS platform designed around role-based onboarding, document validation and admin review workflows.",
    architecture:
      "Built with a modern fullstack architecture using Next.js for the frontend, NestJS for the API, Prisma with PostgreSQL for persistence and shared TypeScript validation across the stack.",
    challenges:
      "The main challenge was handling complex onboarding states, secure document uploads, review statuses and keeping frontend and backend business rules aligned.",
    outcome:
      "A scalable, maintainable platform with strong typing, shared validation, clear domain logic and production-ready workflow patterns.",
    decisions: [
      "Shared validation between frontend and backend using TypeScript and Zod.",
      "Clear separation of concerns between UI, API and business logic layers.",
      "Secure document upload flow with validation and status tracking.",
      "Consistent domain logic enforced across the entire stack.",
    ],
    features: [
      "Role-based dashboards",
      "Secure document upload flow",
      "Admin review workflow",
    ],
  },
  {
    title: "Real-time Messaging Platform",
    slug: "real-time-messaging",
    description:
      "Fullstack application featuring real-time messaging, channels, authentication and interactive UI inspired by modern communication tools.",
    tags: ["React", "Node.js", "WebSocket", "PostgreSQL"],
    context:
      "A real-time communication platform focused on channels, conversations, authentication and responsive user interactions.",
    architecture:
      "Built around a frontend application connected to a backend API with real-time communication handled through WebSocket-based events.",
    challenges:
      "The main challenge was keeping conversations, channel state and user interactions synchronized while maintaining a clean and responsive interface.",
    outcome:
      "A polished fullstack application demonstrating real-time features, interactive UI patterns and structured backend communication.",
    decisions: [
      "WebSocket-based real-time updates for instant messaging experience.",
      "Channel-based architecture to structure conversations efficiently.",
      "Separation between authentication flow and messaging logic.",
      "Optimized UI updates to keep the interface responsive and fluid.",
    ],
    features: [
      "Channel-based conversations",
      "Real-time message updates",
      "Authentication and user sessions",
    ],
  },
] as const;
