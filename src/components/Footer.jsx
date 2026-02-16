import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 text-gray-900 pt-20 pb-10 border-t border-gray-200">
      <div className="max-w-[1400px] mx-auto px-6">
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
                 <div className="relative w-10 h-10 overflow-hidden rounded-full border border-gray-200 group-hover:border-primary transition-colors">
                     <img
                        src="/cu-logo.png"
                        alt="Camden United Logo"
                        className="object-cover w-full h-full"
                      />
                 </div>
              <div>
                <h3 className="text-xl font-oswald font-bold uppercase tracking-wider text-gray-900 group-hover:text-primary transition-colors">
                  Camden United
                </h3>
              </div>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Transforming lives through football. Join the movement and become part of our story.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Instagram].map((Icon, idx) => (
                <a
                  key={idx}
                  href="#"
                  className="w-10 h-10 bg-white border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white hover:border-primary transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {[
              {
                  title: "Club",
                  links: ["About Us", "History", "Staff", "Careers"]
              },
              {
                  title: "Teams",
                  links: ["First Team", "Academy", "Ladies", "Community"]
              },
              {
                  title: "Support",
                  links: ["Contact", "Membership", "Tickets", "Shop"]
              }
          ].map((col, idx) => (
             <div key={idx}>
                <h4 className="text-primary font-oswald font-bold uppercase tracking-widest text-sm mb-6">{col.title}</h4>
                <ul className="space-y-3">
                    {col.links.map(link => (
                        <li key={link}>
                            <Link href="#" className="text-gray-600 hover:text-primary transition-colors text-sm uppercase tracking-wide">
                                {link}
                            </Link>
                        </li>
                    ))}
                </ul>
             </div> 
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-xs uppercase tracking-wider">
            &copy; {currentYear} Camden United FC. All rights reserved.
          </p>
           <div className="flex items-center gap-2">
               <span className="text-gray-500 text-sm uppercase tracking-wider">Designed by</span>
                <a 
                href="https://lunolabs.xyz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <img 
                  src="/Luno-logo.png" 
                  alt="Luno Labs" 
                  className="h-10 w-auto transition-all duration-300"
                />
              </a>
            </div>
        </div>

      </div>
    </footer>
  );
}
