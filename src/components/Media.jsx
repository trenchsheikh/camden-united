'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const instaPosts = [
  { id: 1, type: 'video', src: '/reel.mp4', poster: '/capture.png', alt: 'Islington Cup Champions', caption: '🏆 CAMPIONE! 🏆 #Champions', likes: 493 },
  { id: 2, type: 'image', src: '/first.jpeg', alt: 'Matchday action', caption: 'Big win last weekend! 💪 #CamdenUnited', likes: 124 },
  { id: 3, type: 'image', src: '/abdul.PNG', alt: 'Neighbourhood Hero', caption: 'Neighbourhood Hero 👑 Rest in Power Abdulaziz Munye. 🌹 #CamdenUnited', likes: 3148 },
];

export default function Media() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + instaPosts.length) % instaPosts.length);
  };

  const currentPost = instaPosts[currentIndex];

  return (
    <section id="media" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Follow Us</h4>
            <h2 className="text-4xl md:text-6xl font-oswald font-black uppercase text-gray-900 leading-none">
              @CamdenUnitedFC
            </h2>
          </div>
          
          <a 
            href="https://instagram.com/camdenunitedfc" 
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 text-gray-900 font-oswald uppercase tracking-widest hover:text-primary transition-colors text-lg"
          >
            <Instagram className="w-6 h-6" />
            <span>Follow on Instagram</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full max-w-5xl mx-auto aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute inset-0 w-full h-full flex items-center justify-center"
            >
                {currentPost.type === 'video' ? (
                     <video 
                        src={currentPost.src} 
                        className="w-full h-full object-contain bg-black"
                        controls
                        playsInline
                        poster={currentPost.poster}
                    >
                        Your browser does not support the video tag.
                    </video>
                ) : (
                    <div className="relative w-full h-full bg-black">
                         <Image 
                            src={currentPost.src} 
                            alt={currentPost.alt} 
                            fill 
                            className="object-contain" // maintain aspect ratio within 16:9
                            draggable={false}
                            sizes="(max-width: 1200px) 100vw, 80vw"
                        />
                        {/* Overlay with Caption for images */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 md:p-8 flex justify-between items-end">
                             <p className="text-white text-sm md:text-lg font-medium line-clamp-2 max-w-[80%]">{currentPost.caption}</p>
                             <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider">
                                <span className="text-white">♥</span> {currentPost.likes}
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>
          </AnimatePresence>
            
          {/* Navigation Controls */}
          <button 
            className="absolute top-1/2 left-4 -translate-y-1/2 z-20 bg-black/50 text-white p-3 rounded-full hover:bg-primary transition-colors backdrop-blur-sm"
            onClick={() => paginate(-1)}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            className="absolute top-1/2 right-4 -translate-y-1/2 z-20 bg-black/50 text-white p-3 rounded-full hover:bg-primary transition-colors backdrop-blur-sm"
            onClick={() => paginate(1)}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {instaPosts.map((_, index) => (
                <button
                    key={index}
                    onClick={() => {
                        setDirection(index > currentIndex ? 1 : -1);
                        setCurrentIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                        index === currentIndex ? 'bg-primary w-6' : 'bg-white/50 hover:bg-white'
                    }`}
                />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
