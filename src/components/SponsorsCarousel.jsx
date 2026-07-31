'use client';

import { sponsors } from '@/data/sponsors';

export default function SponsorsCarousel() {
  return (
    <section
      id="sponsors"
      className="relative bg-white border-y border-gray-100 py-14 md:py-16 overflow-hidden"
      aria-label="Sponsors"
    >
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="mb-10 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-oswald font-black uppercase text-gray-900 leading-none tracking-wide">
            Sponsors
          </h2>
          <div className="w-16 h-1.5 bg-primary mt-4" />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 lg:gap-14">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor.name}
              className="flex items-center justify-center min-h-[5.5rem]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={sponsor.src}
                alt={`${sponsor.name} logo`}
                width={sponsor.width}
                height={sponsor.height}
                className={`object-contain w-auto ${sponsor.className}`}
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
