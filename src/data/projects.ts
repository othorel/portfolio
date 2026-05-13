export const projects = [
  {
    title: "Flexitaf",
    slug: "flexitaf",
    description:
      "A recruitment and mission management SaaS currently in progress, focused on onboarding, document validation and administrative workflow automation.",
    href: "https://flexitaf.fr",
    status: "In progress",
    tags: ["Next.js", "NestJS", "Prisma", "PostgreSQL", "S3"],
    context:
      "Flexitaf was built around a common SaaS problem: turning a complex onboarding and validation process into a clear product experience for multiple user roles.",
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
    title: "SerieMatch",
    slug: "serieMatch",
    description:
      "A fullstack series discovery app that helps users find recommendations based on their tastes, platforms, viewing mood and personal preferences.",
    href: "https://seriematch.othorel.fr",
    status: "Live",
    tags: [
      "Next.js",
      "NestJS",
      "Prisma",
      "PostgreSQL",
      "Meilisearch",
      "TMDB API",
      "TypeScript",
      "Zod",
      "Tailwind CSS",
      "shadcn/ui",
    ],
    context:
      "SerieMatch was built as a product-focused fullstack project to make series discovery more personal than a basic catalogue. Users can create an account, complete a preference questionnaire, browse a searchable catalogue and build a personal library around what they want to watch, have already seen or are not interested in.",
    architecture:
      "The application uses Next.js for the frontend, NestJS for the API, Prisma with PostgreSQL for persistence, Meilisearch for catalogue search, and the TMDB API to enrich series data. Shared TypeScript and Zod schemas keep validation and data contracts consistent across the stack.",
    challenges:
      "The main challenge was designing a recommendation flow without relying on AI: user preferences, platform choices, moods, genres and personal ratings all need to influence the recommendation score in a predictable and maintainable way.",
    outcome:
      "The result is a structured fullstack application with authentication, preference onboarding, catalogue search, personal library management and a scoring-based recommendation system that improves as the user rates series.",
    decisions: [
      "Use a scoring algorithm instead of AI to keep recommendations explainable, predictable and easier to iterate on.",
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
  }
] as const;
