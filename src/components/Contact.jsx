'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    details: ['Camden, London', 'United Kingdom'],
    delay: 0,
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: ['+44 (0) 20 XXXX XXXX', 'Mon-Fri, 9AM-6PM'],
    delay: 0.1,
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: ['info@camdenunited.com', "We'll respond shortly"],
    delay: 0.2,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="text-center mb-16">
          <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Get In Touch</h4>
          <h2 className="text-4xl md:text-6xl font-oswald font-black uppercase text-gray-900 leading-none mb-6">
            Contact <br /> The Club
          </h2>
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            className="w-24 h-1 bg-primary mx-auto"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {contactInfo.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: item.delay, duration: 0.5 }}
              className="group bg-gray-50 p-10 text-center hover:bg-white hover:shadow-xl transition-all border border-gray-100 hover:border-primary"
            >
              <div className="w-12 h-12 bg-white text-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:bg-primary group-hover:text-white transition-all">
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-oswald font-bold text-gray-900 uppercase mb-4">{item.title}</h3>
              <div className="space-y-1">
                {item.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-500 text-sm font-medium">
                    {detail}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 bg-primary py-16 px-6 text-center relative overflow-hidden rounded-3xl">
             {/* Background decorative text */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl font-oswald font-black text-black/5 whitespace-nowrap z-0 pointer-events-none uppercase">
                 Join The Club
             </div>
             
             <div className="relative z-10">
                <h3 className="text-3xl md:text-5xl font-oswald font-black uppercase text-white mb-8">Ready to Join Camden United?</h3>
                <button className="bg-white text-primary font-oswald font-bold uppercase tracking-widest py-4 px-10 hover:bg-gray-900 hover:text-white transition-colors shadow-2xl">
                    Register Now
                </button>
             </div>
        </div>

      </div>
    </section>
  );
}
