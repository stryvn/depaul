"use client";

import { useNearViewport } from "@/components/ui/useNearViewport";

export function CampusMap({ className }: { className: string }) {
  const { ref, isNear } = useNearViewport();

  return (
    <div ref={ref} className={className}>
      {isNear && (
        <iframe
          src="https://maps.google.com/maps?q=De+Paul+Public+School+Rajamudy+Idukki&t=&z=15&ie=UTF8&iwloc=&output=embed"
          title="Google Maps location of De Paul Public School Rajamudy"
          className="absolute inset-0 h-full w-full border-0"
          allowFullScreen
        />
      )}
    </div>
  );
}
