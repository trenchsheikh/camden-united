'use client';

import { sponsors } from '@/data/sponsors';

function SponsorLogo({ sponsor, className }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={sponsor.src}
      alt={`${sponsor.name} logo`}
      width={sponsor.width}
      height={sponsor.height}
      className={className}
      draggable={false}
    />
  );
}

export default function SponsorsCarousel() {
  const loop = [...sponsors, ...sponsors];

  return (
    <section
      id="sponsors"
      className="relative bg-white border-y border-gray-100 py-14 md:py-16 overflow-hidden"
      aria-label="Sponsors"
    >
      <div className="max-w-[1400px] mx-auto px-6 mb-10 md:mb-12">
        <h2 className="text-3xl md:text-5xl font-oswald font-black uppercase text-gray-900 leading-none tracking-wide">
          Sponsors
        </h2>
        <div className="w-16 h-1.5 bg-primary mt-4" />
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-28 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-28 bg-gradient-to-l from-white to-transparent" />

        <div className="overflow-hidden">
          <div className="flex w-max items-center gap-14 md:gap-24 px-8 animate-sponsor-marquee hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:w-full motion-reduce:justify-center motion-reduce:gap-10">
            {loop.map((sponsor, index) => (
              <div
                key={`${sponsor.name}-${index}`}
                className="flex shrink-0 items-center justify-center"
              >
                <SponsorLogo
                  sponsor={sponsor}
                  className="object-contain w-auto h-20 sm:h-24 md:h-28 lg:h-32 max-w-[14rem] sm:max-w-[16rem] md:max-w-[18rem]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
