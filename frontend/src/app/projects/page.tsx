"use client";

import Footer from "@/components/Footer";
import ProjectsSection from "@/components/Projects/ProjectsSection";

export default function ProjectsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-600 to-pink-500 px-6 py-10 w-full">
        <div className="w-full max-w-6xl">
          <h1 className="text-4xl font-extrabold text-center text-indigo-200 mb-10 drop-shadow-lg">
            Mes Projets
          </h1>
          <ProjectsSection />
        </div>
      </main>
      <Footer />
    </div>
  );
}
