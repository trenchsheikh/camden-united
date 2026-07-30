'use client';

import { motion } from 'framer-motion';
import { Heart, Users, Shield, ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import { scrollToHash } from '@/lib/scroll';

const features = [
  {
    icon: Heart,
    title: 'Born From Community',
    description:
      'Founded in 2019 as a CIC after friends were lost to serious youth violence. It began as a support network that grew into Camden’s leading youth football provision for ages 16+.',
  },
  {
    icon: Users,
    title: 'Lived Experience',
    description:
      'Our founders, coaches, and volunteers grew up on Camden’s working class estates, giving us the credibility to reach young men who may never access formal support services.',
  },
  {
    icon: Shield,
    title: 'More Than Football',
    description:
      'Weekly football sits alongside mentoring, workshops, and partnerships that open doors into education, employment, coaching, and community leadership.',
  },
];

const stats = [
  { value: '2019', label: 'Founded as a CIC' },
  { value: '80 to 100', label: 'Active members each week' },
  { value: '16+', label: 'Young men we support' },
  { value: '7 yrs', label: 'Sustained community delivery' },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-white relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">
              Who We Are
            </h4>
            <h2 className="text-4xl md:text-6xl font-oswald font-black uppercase text-gray-900 mb-8 leading-none">
              More Than <br /> Just A Club
            </h2>
            <div className="w-20 h-2 bg-primary mb-8" />

            <div className="space-y-5 text-gray-600 text-lg leading-relaxed mb-8">
              <p>
                Camden United FC is a registered Community Interest Company founded in 2019
                by a group of friends following the tragic loss of several close friends to
                serious youth violence in Camden. What began as a support network for a few
                friends and family has evolved into the borough&apos;s leading provider of youth
                provision for young people aged 16+, supporting 80 to 100 active members each
                week through football, mentoring, and personal development.
              </p>
              <p>
                Football is how we bring young men together, but our work goes further.
                Through trusted relationships and long term support, we help members build
                resilience, ambition, and wellbeing, and connect them to workshops and
                opportunities across Camden. We run an open age Saturday team, two midweek
                teams for ages 16 to 25, and a side for founding members aged 25 and over.
              </p>
              <p>
                Through the Munye League, founded and run by Camden United, we also connect
                young people across eight Camden based clubs in the open age league and five
                organisations in the 16 to 18 programme, creating a trusted network of support
                and opportunity beyond our own squads.
              </p>
            </div>

            <p className="text-gray-800 font-medium text-xl leading-relaxed italic border-l-4 border-primary pl-6 mb-10">
              Working with young men is central to our mission. Through lived experience
              and long term support, we help them build resilience, develop ambition, and
              create positive futures for themselves and their communities.
            </p>

            <a
              href="#partners"
              onClick={(event) => {
                event.preventDefault();
                scrollToHash('#partners');
              }}
              className="inline-flex items-center gap-3 px-8 py-3 border-2 border-gray-900 text-gray-900 font-oswald font-bold uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-colors"
            >
              Partner With Us
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08, duration: 0.45 }}
                  className="border border-gray-100 bg-gray-50 px-5 py-6"
                >
                  <p className="text-3xl md:text-4xl font-oswald font-black text-primary leading-none mb-2">
                    {stat.value}
                  </p>
                  <p className="text-xs font-oswald uppercase tracking-widest text-gray-500">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="grid gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + index * 0.12, duration: 0.5 }}
                  className={clsx(
                    'p-7 border transition-all',
                    index === 0
                      ? 'bg-primary border-primary text-white shadow-xl'
                      : 'bg-white border-gray-100 hover:border-primary text-gray-900'
                  )}
                >
                  <feature.icon
                    className={clsx(
                      'w-8 h-8 mb-4',
                      index === 0 ? 'text-white' : 'text-primary'
                    )}
                  />
                  <h3
                    className={clsx(
                      'text-xl font-oswald font-bold uppercase mb-2',
                      index === 0 ? 'text-white' : 'text-gray-900'
                    )}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className={clsx(
                      'text-sm leading-relaxed',
                      index === 0 ? 'text-white/90' : 'text-gray-500'
                    )}
                  >
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
