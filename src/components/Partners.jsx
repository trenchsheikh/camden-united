'use client';

import { motion } from 'framer-motion';
import { Check, Mail, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { sponsors } from '@/data/sponsors';

const PARTNER_EMAIL = 'lida@camdenunitedfc.com';
const CAMDEN_ALGORITHM_URL = 'https://rsvp.withgoogle.com/events/camdenalgorithm/home';

const caseStudies = [
  {
    id: 'camden-algorithm',
    image: '/camden-algorithm-content-1.png',
    imageAlt:
      'Camden United youth steering committee and partners outside Google HQ for The Camden Algorithm',
    logo: '/google-logo.png',
    logoAlt: 'Google',
    logoClassName: 'object-contain h-14 sm:h-16 md:h-20 w-auto max-w-[16rem]',
    meta: "September 2025 · Google HQ, King's Cross",
    title: 'The Camden Algorithm',
    link: {
      href: CAMDEN_ALGORITHM_URL,
      label: 'View event page',
    },
    paragraphs: [
      'In partnership with Google, Young Camden Foundation and Camden Giving, Camden United helped deliver The Camden Algorithm, a youth led AI and careers event at Google HQ for young people aged 16 to 25 living, working or studying in Camden.',
      'Over six months, a Youth Steering Committee of 15 young people, including Camden United members, co designed and delivered the full programme. The day brought together 200+ attendees for workshops on AI careers and personal branding, Google apprenticeship panels, hands on sessions with tools like Gemini and NotebookLM, and networking with industry leaders and local civic partners.',
      'The partnership showed what happens when a grassroots club and a global company invest in young people from Camden: real access, real skills, and a platform that proves football can open doors far beyond the pitch.',
    ],
    highlightPhrases: ['The Camden Algorithm', '200+ attendees'],
    stats: [
      { label: 'Attendees', value: '200+' },
      { label: 'Youth steers', value: '15' },
      { label: 'Months to deliver', value: '6' },
    ],
  },
  {
    id: 'mental-resilience',
    image: '/mental-resiliance.jpeg',
    imageAlt:
      'Young men from Camden United in a circle discussion during a mental resilience workshop',
    logo: null,
    eyebrow: 'Wellbeing · Youth programme',
    meta: '7 June 2026 · 16:15 to 17:00 · Peckwater Estate, NW5 2UD',
    title: 'Mental Resilience Workshop',
    paragraphs: [
      'Camden United hosted a Mental Resilience Workshop for young men in our community, creating a safe space to talk openly about pressure, wellbeing, and building mental strength, using trusted relationships and football culture as the way in.',
      'Guest speaker Jermaine Anderson (GMBPsS), a former professional footballer, shared lived experience and practical tools with members in a community setting at Peckwater Estate. Sessions like this sit at the heart of our mission: football first, then honest conversations that help young men seek support before reaching crisis point.',
      'The workshop was delivered with support from GO! London and funded by the Mayor of London, in partnership with London Marathon Foundation, The National Lottery, and Sport England, showing how sport funding can unlock real mental health conversations for young people in Camden.',
    ],
    highlightPhrases: ['Jermaine Anderson (GMBPsS)', 'GO! London', 'Mayor of London'],
    stats: [
      { label: 'Guest speaker', value: 'Jermaine Anderson' },
      { label: 'Focus', value: 'Mental resilience' },
      { label: 'Funded by', value: 'Mayor of London' },
    ],
  },
  {
    id: '32-boro-cup',
    image: '/boro-cup.jpeg',
    imageAlt:
      'Camden United players representing Camden at the London 32 Borough Cup',
    logo: null,
    eyebrow: 'Grassroots · London wide',
    meta: 'London 32 Borough Cup · Representing Camden',
    title: '32 Borough Cup',
    link: {
      href: 'https://thinkoutsidetheblox.co.uk/32-boro-cup',
      label: 'About the 32 Boro Cup',
    },
    paragraphs: [
      'Camden United took part in the London 32 Borough Cup, the annual grassroots tournament that brings together young players from across all 32 London boroughs. Founded to combat youth violence and strengthen community relations, the Cup uses football to unite young people from different walks of life on one pitch.',
      'Representing Camden, our squad gave local young men a proud platform to compete citywide, build confidence, and connect with peers beyond their estates. Taking part meant more than matchday football: it was a chance to belong to something bigger, travel together as a team, and show what Camden talent looks like when young people are trusted and backed.',
      'That is how we engage youth: through real competition, shared identity, and positive pathways that keep young men involved in sport and community life rather than on the sidelines. Events like the 32 Borough Cup sit alongside our weekly football, mentoring, and workshops as part of a wider journey of opportunity for Camden United members.',
    ],
    highlightPhrases: [
      'London 32 Borough Cup',
      'Representing Camden',
      'combat youth violence',
    ],
    stats: [
      { label: 'Representing', value: 'Camden' },
      { label: 'London boroughs', value: '32' },
      { label: 'Focus', value: 'Youth engagement' },
    ],
  },
];

function highlightText(text, phrases = []) {
  if (!phrases.length) return text;

  const escaped = phrases.map((phrase) =>
    phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  );
  const pattern = new RegExp(`(${escaped.join('|')})`, 'g');
  const parts = text.split(pattern);

  return parts.map((part, index) =>
    phrases.includes(part) ? (
      <strong key={index} className="text-gray-900 font-semibold">
        {part}
      </strong>
    ) : (
      <span key={index}>{part}</span>
    )
  );
}

const partnerBenefits = [
  'Direct visibility with an engaged, growing local community',
  'A genuine, story led partnership, not just a logo placement',
  'Association with a mission driven club making a real difference for young people in Camden',
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
          <div className="flex flex-wrap items-center gap-8 md:gap-14 py-10 border-y border-gray-200">
            {sponsors.map((partner) => (
              <div
                key={partner.name}
                className="flex items-center justify-center min-h-[7rem] md:min-h-[8.5rem]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={partner.src}
                  alt={`${partner.name} logo`}
                  width={partner.width}
                  height={partner.height}
                  className="object-contain w-auto h-20 sm:h-24 md:h-28 max-w-[16rem] md:max-w-[18rem]"
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
                Camden United is more than a football club; we&apos;re a community driven
                movement founded by young people from Camden, built on the belief that
                football should be a route to opportunity, not just competition. As a CIC
                supporting young men aged 16+, we run three teams: Saturday open age First Team, two
                midweek sides for ages 16 to 25, and a founding members team (25+), giving
                members structure, belonging, and a pathway both on the pitch and off it.
              </p>
              <p>
                Partnering with Camden United means aligning your brand with a genuine
                grassroots story: real players, real community impact, and a mission rooted
                in giving young people in Camden a stronger future. Our partners don&apos;t
                just sponsor a shirt. They become part of that story, visible to our
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

        <div className="space-y-20 md:space-y-28">
          {caseStudies.map((study, index) => (
            <motion.article
              key={study.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.05 }}
              className="space-y-8 md:space-y-10"
            >
              {index > 0 ? <div className="border-t border-gray-200 pt-16 md:pt-20" /> : null}

              <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                <div className="lg:col-span-4 space-y-6">
                  {study.logo ? (
                    <div className="inline-flex items-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={study.logo}
                        alt={study.logoAlt}
                        width={240}
                        height={80}
                        className={study.logoClassName}
                      />
                    </div>
                  ) : study.eyebrow ? (
                    <p className="text-sm font-oswald font-bold uppercase tracking-widest text-gray-500">
                      {study.eyebrow}
                    </p>
                  ) : null}

                  <p className="text-primary font-oswald font-bold uppercase tracking-widest text-sm">
                    {study.meta}
                  </p>
                  <h3 className="text-3xl md:text-4xl font-oswald font-black uppercase text-gray-900 leading-tight">
                    {study.title}
                  </h3>

                  {study.link ? (
                    <Link
                      href={study.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-gray-900 font-oswald uppercase tracking-widest text-sm border-b-2 border-primary pb-1 hover:text-primary transition-colors"
                    >
                      {study.link.label}
                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
                  ) : null}

                  <div
                    className={`overflow-hidden bg-gray-100 border border-gray-200 ${
                      study.id === 'camden-algorithm' || study.id === 'mental-resilience'
                        ? 'max-w-sm'
                        : 'w-full'
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={study.image}
                      alt={study.imageAlt}
                      className={`w-full h-auto object-contain ${
                        study.id === 'camden-algorithm' || study.id === 'mental-resilience'
                          ? 'max-h-56 md:max-h-64'
                          : 'max-h-72 md:max-h-80'
                      }`}
                    />
                  </div>
                </div>

                <div className="lg:col-span-8 space-y-6 text-gray-600 leading-relaxed text-lg">
                  {study.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 48)}>
                      {highlightText(paragraph, study.highlightPhrases)}
                    </p>
                  ))}

                  <dl className="grid sm:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
                    {study.stats.map((stat) => (
                      <div key={stat.label}>
                        <dt className="text-xs font-oswald uppercase tracking-widest text-gray-400 mb-1">
                          {stat.label}
                        </dt>
                        <dd className="text-2xl md:text-3xl font-oswald font-black text-gray-900 leading-tight">
                          {stat.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
