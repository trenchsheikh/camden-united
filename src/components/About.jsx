'use client';

import { motion } from 'framer-motion';
import { Target, Heart, Shield } from 'lucide-react';
import clsx from 'clsx';

const features = [
  {
    icon: Heart,
    title: 'Community First',
    description: 'Football for everyone, regardless of background.',
    color: 'text-primary',
  },
  {
    icon: Target,
    title: 'Excellence',
    description: 'Structured pathways from grassroots to senior level.',
    color: 'text-gray-900',
  },
    {
    icon: Shield,
    title: 'Integrity',
    description: 'Building character through sportsmanship and respect.',
    color: 'text-gray-900',
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-white relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Who We Are</h4>
                <h2 className="text-4xl md:text-6xl font-oswald font-black uppercase text-gray-900 mb-8 leading-none">
                    More Than <br /> Just A Club
                </h2>
                <div className="w-20 h-2 bg-primary mb-8" />
                
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    Camden United is a community-driven movement. Founded by young men from working-class backgrounds, we believe football should be accessible to everyone. We are dedicated to fostering talent, teamwork, and sportsmanship.
                </p>
                
                <p className="text-gray-800 font-medium text-xl leading-relaxed italic border-l-4 border-primary pl-6 mb-10">
                    "Our mission is to create positive change in Camden through football, providing opportunities for young people while building a stronger community."
                </p>
                
                <button className="px-8 py-3 border-2 border-gray-900 text-gray-900 font-oswald font-bold uppercase tracking-widest hover:bg-gray-900 hover:text-white transition-colors">
                    Read Our History
                </button>
            </motion.div>

            {/* Right Features */}
            <div className="grid sm:grid-cols-2 gap-6">
                 {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2, duration: 0.6 }}
                        className={clsx(
                            "p-8 border transition-all group",
                            index === 0 
                                ? "sm:col-span-2 bg-primary border-primary text-white shadow-xl" 
                                : "bg-gray-50 border-gray-100 hover:border-primary text-gray-900"
                        )}
                    >
                        <feature.icon className={clsx("w-10 h-10 mb-6", index === 0 ? "text-white" : "text-primary")} />
                        <h3 className={clsx("text-2xl font-oswald font-bold uppercase mb-2", index === 0 ? "text-white" : "text-gray-900")}>
                            {feature.title}
                        </h3>
                        <p className={clsx("text-sm", index === 0 ? "text-white/90" : "text-gray-500")}>
                            {feature.description}
                        </p>
                    </motion.div>
                ))}
            </div>
            
        </div>
      </div>
    </section>
  );
}
