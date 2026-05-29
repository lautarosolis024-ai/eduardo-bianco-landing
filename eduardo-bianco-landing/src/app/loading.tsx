import SectionSkeleton from "@/components/sections/SectionSkeleton";

export default function Loading() {
  return (
    <div role="status" aria-busy="true" aria-label="Cargando contenido">
      <SectionSkeleton />
    </div>
  );
}
