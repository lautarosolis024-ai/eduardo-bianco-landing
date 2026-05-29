/**
 * SectionSkeleton — reusable Suspense fallback for lazy-loaded sections.
 * Extracted here so it can be used in both page.tsx and loading.tsx
 * without creating circular dependencies.
 */
export default function SectionSkeleton() {
  return (
    <div className="bg-black py-28 md:py-40 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="h-10 w-64 bg-white/5 rounded-lg mb-8 animate-pulse" />
        <div className="h-6 w-96 bg-white/5 rounded-lg mb-4 animate-pulse" />
        <div className="h-6 w-72 bg-white/5 rounded-lg animate-pulse" />
      </div>
    </div>
  );
}
