'use client';

import { motion } from 'framer-motion';
import { Check, Mail, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const PARTNER_EMAIL = 'admin@camdenunitedfc.com';
const CAMDEN_ALGORITHM_URL = 'https://rsvp.withgoogle.com/events/camdenalgorithm/home';

const currentPartners = [
  {
    name: 'Google',
    src: '/google-logo.png',
    width: 160,
    height: 54,
    className: 'h-10 md:h-12',
  },
  {
    name: 'Camden Fostering',
    src: '/camdenfostering-removebg-preview.png',
    width: 160,
    height: 80,
    className: 'h-14 md:h-16',
  },
  {
    name: 'AHA Global',
    src: '/aha-removebg-preview.png',
    width: 200,
    height: 60,
    className: 'h-10 md:h-12',
  },
  {
    name: 'V7',
    src: '/v7-removebg-preview.png',
    width: 100,
    height: 100,
    className: 'h-14 md:h-16',
  },
];

const partnerBenefits = [
  'Direct visibility with an engaged, growing local community',
  'A genuine, story-led partnership — not just a logo placement',
  'Association with a mission-driven club making a real difference for young people in Camden',
  'Opportunities across shirt sponsorship, matchday and advertising placements, content collaboration, and community events',
];

export default function Partners() {
  return (
    <section id="partners" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16"
        >
          <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-2">
            Partnerships
          </h4>
          <h2 className="text-4xl md:text-6xl font-oswald font-black uppercase text-gray-900 leading-none mb-6">
            Partner with Us
          </h2>
          <div className="w-20 h-2 bg-primary mb-6" />
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
            Join the companies backing Camden&apos;s next generation, on and off the pitch.
          </p>
        </motion.div>

        {/* Current Partners */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-20"
        >
          <h3 className="text-sm font-oswald font-bold uppercase tracking-widest text-gray-500 mb-8">
            Current Partners
          </h3>
          <div className="flex flex-wrap items-center gap-6 md:gap-10 py-8 border-y border-gray-200">
            {currentPartners.map((partner) => (
              <div
                key={partner.name}
                className="flex items-center justify-center min-h-[5.5rem]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={partner.src}
                  alt={`${partner.name} logo`}
                  width={partner.width}
                  height={partner.height}
                  className={`object-contain w-auto max-w-[11rem] ${partner.className}`}
                />
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 mb-20">
          {/* Why partner */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <h3 className="text-2xl md:text-3xl font-oswald font-bold uppercase text-gray-900 mb-6">
              Why partner with us
            </h3>
            <div className="space-y-5 text-gray-600 leading-relaxed">
              <p>
                Camden United is more than a football club; we&apos;re a community-driven
                movement founded by young people from Camden, built on the belief that
                football should be a route to opportunity, not just competition. From youth
                development (ages 8–16) through to our senior squad, we run 12+ teams across
                the community, giving young people in Camden structure, belonging, and a
                pathway — both on the pitch and off it.
              </p>
              <p>
                Partnering with Camden United means aligning your brand with a genuine
                grassroots story: real players, real community impact, and a mission rooted
                in giving young people in Camden a stronger future. Our partners don&apos;t
                just sponsor a shirt — they become part of that story, visible to our
                community both in Camden and across London.
              </p>
            </div>
          </motion.div>

          {/* What partners get */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <h3 className="text-2xl md:text-3xl font-oswald font-bold uppercase text-gray-900 mb-6">
              What our partners get
            </h3>
            <ul className="space-y-4">
              {partnerBenefits.map((benefit) => (
                <li key={benefit} className="flex gap-4 items-start">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center bg-primary text-white">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-gray-700 leading-relaxed pt-0.5">{benefit}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Google callout + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900 text-white px-8 py-12 md:px-14 md:py-16 relative overflow-hidden"
        >
          <div className="absolute -right-10 -top-10 text-[10rem] font-oswald font-black text-white/5 leading-none select-none pointer-events-none uppercase">
            Partners
          </div>
          <div className="relative z-10 max-w-3xl">
            <p className="text-white/90 text-lg md:text-xl leading-relaxed mb-8">
              We&apos;re proud to be backed by partners including Google, whose support has
              helped power both our team and our work in the community.
            </p>
            <p className="text-sm font-oswald uppercase tracking-widest text-primary mb-3">
              Interested in partnering with us?
            </p>
            <a
              href={`mailto:${PARTNER_EMAIL}`}
              className="group inline-flex items-center gap-3 text-2xl md:text-3xl font-oswald font-bold uppercase tracking-wide text-white hover:text-primary transition-colors"
            >
              <Mail className="h-6 w-6 text-primary" />
              {PARTNER_EMAIL}
              <ArrowUpRight className="h-5 w-5 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function CaseStudies() {
  return (
    <section id="case-studies" className="py-24 bg-gray-50 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-2">
            Impact
          </h4>
          <h2 className="text-4xl md:text-6xl font-oswald font-black uppercase text-gray-900 leading-none mb-6">
            Case Studies
          </h2>
          <div className="w-20 h-2 bg-primary" />
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start"
        >
          <div className="lg:col-span-4 space-y-6">
            <div className="inline-flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/google-logo.png"
                alt="Google"
                width={140}
                height={48}
                className="object-contain h-8 w-auto"
              />
            </div>
            <p className="text-primary font-oswald font-bold uppercase tracking-widest text-sm">
              September 2025 · Google HQ, King&apos;s Cross
            </p>
            <h3 className="text-3xl md:text-4xl font-oswald font-black uppercase text-gray-900 leading-tight">
              The Camden Algorithm
            </h3>
            <Link
              href={CAMDEN_ALGORITHM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-900 font-oswald uppercase tracking-widest text-sm border-b-2 border-primary pb-1 hover:text-primary transition-colors"
            >
              View event page
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="lg:col-span-8 space-y-6 text-gray-600 leading-relaxed text-lg">
            <p>
              In partnership with Google, Young Camden Foundation and Camden Giving, Camden
              United helped deliver <strong className="text-gray-900 font-semibold">The Camden Algorithm</strong> —
              a youth-led AI and careers event at Google HQ for young people aged 16–25 living,
              working or studying in Camden.
            </p>
            <p>
              Over six months, a Youth Steering Committee of 15 young people — including
              Camden United members — co-designed and delivered the full programme. The day
              brought together <strong className="text-gray-900 font-semibold">200+ attendees</strong> for
              workshops on AI careers and personal branding, Google apprenticeship panels,
              hands-on sessions with tools like Gemini and NotebookLM, and networking with
              industry leaders and local civic partners.
            </p>
            <p>
              The partnership showed what happens when a grassroots club and a global company
              invest in young people from Camden: real access, real skills, and a platform
              that proves football can open doors far beyond the pitch.
            </p>

            <dl className="grid sm:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
              {[
                { label: 'Attendees', value: '200+' },
                { label: 'Youth steers', value: '15' },
                { label: 'Months to deliver', value: '6' },
              ].map((stat) => (
                <div key={stat.label}>
                  <dt className="text-xs font-oswald uppercase tracking-widest text-gray-400 mb-1">
                    {stat.label}
                  </dt>
                  <dd className="text-3xl font-oswald font-black text-gray-900">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
