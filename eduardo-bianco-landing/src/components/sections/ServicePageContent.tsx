"use client";

import { m, useInView } from "framer-motion";
import { useRef } from "react";
import type { ServiceContentBlock } from "@/lib/services-data";

interface ServicePageContentProps {
  contentBlocks: ServiceContentBlock[];
}

export default function ServicePageContent({
  contentBlocks,
}: ServicePageContentProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      role="region"
      aria-labelledby={`content-heading-${contentBlocks[0]?.heading?.slice(0, 20) ?? "section"}`}
      className="bg-black py-16 md:py-24 px-6"
    >
      <div className="max-w-3xl mx-auto">
        {contentBlocks.map((block, i) => (
          <m.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 * Math.min(i, 3) }}
            className="mb-12 last:mb-0"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-white tracking-tight font-instrument mb-4">
              {block.heading}
            </h2>
            <p className="text-white/80 text-base md:text-lg leading-relaxed">
              {block.body}
            </p>
          </m.div>
        ))}
      </div>
    </section>
  );
}
