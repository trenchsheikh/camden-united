import React, { useState, useEffect } from 'react';
import { ChevronDown, Users, Target, Trophy, Heart, MapPin, Phone, Mail, Calendar, Play } from 'lucide-react';

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(sectionId);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-red-600/95 backdrop-blur-sm shadow-xl' : 'bg-black/30 backdrop-blur-sm'
      }`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <img 
                src="/cu-logo.png" 
                alt="Camden United Logo" 
                className="w-28 h-28 object-contain bg-transparent"
              />
              <div>
                <h1 className="text-white font-bold text-xl">Camden United</h1>
                <p className="text-red-100 text-xs">Football Club</p>
              </div>
            </div>
            
            <div className="hidden md:flex space-x-8">
              {['Home', 'About', 'Teams', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-white hover:text-red-200 transition-colors font-medium hover:scale-105 transform duration-200"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Sunday.jpg background */}
      <section 
        id="home" 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(/sunday.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        {/* Red gradient overlay for brand consistency */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/40 via-red-700/30 to-red-800/40"></div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white opacity-20 rounded-full"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white opacity-25 rounded-full"></div>
          <div className="absolute top-3/4 left-1/2 w-32 h-32 bg-white opacity-15 rounded-full"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-5xl mx-auto px-4">
          <div className="mb-8 animate-fade-in">
            <img 
              src="/cu-logo.png" 
              alt="Camden United Logo" 
              className="w-28 h-28 mx-auto mb-8 object-contain bg-transparent transform hover:scale-110 transition-transform duration-500"
            />
            <h1 className="text-7xl md:text-9xl font-black mb-6 tracking-tight drop-shadow-2xl">
              <span className="block transform hover:scale-105 transition-transform duration-500">CAMDEN</span>
              <span className="block transform hover:scale-105 transition-transform duration-500 delay-200">UNITED</span>
            </h1>
            <div className="w-40 h-2 bg-white mx-auto mb-8 rounded-full animate-slide-in shadow-lg"></div>
          </div>
          
          <p className="text-2xl md:text-3xl mb-4 font-light opacity-95 animate-fade-in-up delay-500 drop-shadow-lg">
            United in Passion. Driven by Excellence.
          </p>
          <p className="text-lg md:text-xl mb-12 opacity-90 animate-fade-in-up delay-700 drop-shadow-lg">
            More than a football club — a community-driven movement transforming lives through sport
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up delay-1000">
            <button 
              onClick={() => scrollToSection('about')}
              className="group bg-white text-red-600 font-bold py-4 px-10 rounded-full hover:bg-red-50 transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-white/20"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>Discover Our Story</span>
                <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            <button 
              onClick={() => scrollToSection('teams')}
              className="group border-3 border-white text-white font-bold py-4 px-10 rounded-full hover:bg-white hover:text-red-600 transition-all duration-300 transform hover:scale-110 backdrop-blur-sm"
            >
              <span className="flex items-center justify-center space-x-2">
                <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Join Our Teams</span>
              </span>
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-10 h-10 text-white opacity-70 drop-shadow-lg" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Who We Are</h2>
            <div className="w-32 h-2 bg-red-600 mx-auto mb-10 rounded-full"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Camden United is a community-driven club dedicated to fostering talent, teamwork, and sportsmanship across all levels of football.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div className="space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Heart className="w-8 h-8 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Community First</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Founded by young men from working-class backgrounds, we believe football should be accessible to everyone, regardless of background or financial status.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Target className="w-8 h-8 text-red-600" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">Excellence & Growth</h3>
                    <p className="text-gray-700 leading-relaxed">
                      We provide structured pathways for players to progress from grassroots to senior football, helping them reach their full potential.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-600 text-white p-10 rounded-3xl transform hover:scale-105 transition-transform duration-300 relative overflow-hidden">
              {/* Subtle background pattern */}
              <div 
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'url(/cu-logo.png)',
                  backgroundSize: '150px',
                  backgroundRepeat: 'repeat',
                  backgroundPosition: 'center'
                }}
              ></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
                <p className="text-xl mb-6 opacity-95 leading-relaxed">
                  To create positive change in Camden through football, providing opportunities for young people while building a stronger, more united community.
                </p>
                <div className="bg-white bg-opacity-20 p-6 rounded-2xl backdrop-blur-sm">
                  <p className="font-semibold text-lg">
                    "Camden United is more than just football — we are a movement dedicated to transforming young lives."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teams Section with First.jpg background */}
      <section 
        id="teams" 
        className="py-24 relative"
        style={{
          backgroundImage: 'url(/first.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* White overlay for readability */}
        <div className="absolute inset-0 bg-white/90"></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">Our Teams</h2>
            <div className="w-32 h-2 bg-red-600 mx-auto mb-10 rounded-full"></div>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              We have teams for all ages and skill levels. Whether you're a beginner or a seasoned player, there's a place for you at Camden United.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Youth Development",
                age: "Ages 8-16",
                description: "Building fundamental skills and fostering a love for the game",
                icon: "🌟",
                color: "from-blue-500 to-blue-600"
              },
              {
                title: "Senior Teams",
                age: "Ages 17+",
                description: "Competitive football in local leagues with professional coaching",
                icon: "⚽",
                color: "from-red-500 to-red-600"
              },
              {
                title: "Community League",
                age: "All Ages",
                description: "Casual and competitive options for community members",
                icon: "🏆",
                color: "from-green-500 to-green-600"
              }
            ].map((team, index) => (
              <div key={index} className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 bg-white/95 backdrop-blur-sm">
                <div className={`bg-gradient-to-br ${team.color} p-8 text-white h-full`}>
                  <div className="text-5xl mb-4">{team.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">{team.title}</h3>
                  <p className="text-lg opacity-90 mb-4">{team.age}</p>
                  <p className="opacity-85 leading-relaxed">{team.description}</p>
                  <button className="mt-6 bg-white bg-opacity-20 text-white px-6 py-3 rounded-full font-semibold hover:bg-opacity-30 transition-all duration-300 group-hover:scale-105 backdrop-blur-sm">
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <div className="bg-white/95 backdrop-blur-sm p-10 rounded-3xl inline-block shadow-xl">
              <Calendar className="w-16 h-16 text-red-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Join?</h3>
              <p className="text-gray-700 mb-6 max-w-md">
                Training sessions run throughout the week at various times to accommodate all schedules.
              </p>
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-red-600 text-white font-bold py-4 px-8 rounded-full hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Get Started Today
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-900 text-white relative overflow-hidden">
        {/* Subtle background pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'url(/cu-logo.png)',
            backgroundSize: '200px',
            backgroundRepeat: 'repeat',
            backgroundPosition: 'center'
          }}
        ></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6">Get In Touch</h2>
            <div className="w-32 h-2 bg-red-600 mx-auto mb-10 rounded-full"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Want to learn more or join the club? We'd love to hear from you and welcome you to the Camden United family.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: MapPin,
                title: "Visit Us",
                info: "Camden, London",
                details: "Training grounds and community center"
              },
              {
                icon: Phone,
                title: "Call Us",
                info: "+44 (0) 7837 241114",
                details: "Monday - Friday, 9AM - 6PM"
              },
              {
                icon: Mail,
                title: "Email Us",
                info: "info@camdenunited.com",
                details: "We'll respond within 24 hours"
              }
            ].map((contact, index) => (
              <div key={index} className="bg-gray-800/80 backdrop-blur-sm p-8 rounded-3xl text-center hover:bg-gray-700/80 transition-all duration-300 transform hover:-translate-y-2 border border-gray-700">
                <contact.icon className="w-16 h-16 text-red-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4">{contact.title}</h3>
                <p className="text-xl text-red-400 mb-2">{contact.info}</p>
                <p className="text-gray-300">{contact.details}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-red-600 text-white font-bold py-6 px-12 rounded-full hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-2xl text-xl">
              Join Camden United Today
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16 relative overflow-hidden">
        {/* Background pattern */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'url(/cu-logo.png)',
            backgroundSize: '150px',
            backgroundRepeat: 'repeat',
            backgroundPosition: 'center'
          }}
        ></div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <img 
                  src="/cu-logo.png" 
                  alt="Camden United Logo" 
                  className="w-16 h-16 rounded-full shadow-lg"
                />
                <div>
                  <h3 className="text-2xl font-bold">Camden United FC</h3>
                  <p className="text-gray-400">More than a club</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-md mb-6">
                A community-driven movement dedicated to transforming lives through football, education, and opportunity.
              </p>
              <div className="flex space-x-4">
                {['Facebook', 'Twitter', 'Instagram'].map((social) => (
                  <div key={social} className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer">
                    <span className="text-sm font-bold">{social[0]}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3 text-gray-400">
                {['About Us', 'Our Teams', 'Training', 'News', 'Contact'].map((link) => (
                  <li key={link}>
                    <button className="hover:text-white transition-colors">{link}</button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-6">Programs</h4>
              <ul className="space-y-3 text-gray-400">
                {['Youth Development', 'Senior Teams', 'Community League', 'Coaching', 'Camps'].map((program) => (
                  <li key={program}>
                    <button className="hover:text-white transition-colors">{program}</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 text-lg">
              &copy; {new Date().getFullYear()} Camden United Football Club. All rights reserved.
            </p>
            <div className="mt-4 flex flex-col items-center space-y-2">
              <span className="text-gray-500 text-sm">Website designed by</span>
              <a 
                href="https://www.awal.solutions" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <img 
                  src="/AWAL-Logo.png" 
                  alt="AWAL Solutions" 
                  className="h-12 w-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-in {
          from { width: 0; }
          to { width: 10rem; }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
        
        .animate-slide-in {
          animation: slide-in 1.5s ease-out forwards;
        }
        
        .delay-200 { animation-delay: 0.2s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-700 { animation-delay: 0.7s; }
        .delay-1000 { animation-delay: 1s; }
        .delay-2000 { animation-delay: 2s; }
      `}</style>
    </div>
  );
}

export default App;
