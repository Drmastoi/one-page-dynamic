import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavItem {
  id: string;
  title: string;
  number: number;
}

const navItems: NavItem[] = [
  { id: 'section-1', title: 'Personal Information', number: 1 },
  { id: 'section-2', title: 'Accident Details', number: 2 },
  { id: 'section-3', title: 'Neck Pain', number: 3 },
  { id: 'section-4', title: 'Shoulder Pain', number: 4 },
  { id: 'section-5', title: 'Back Pain', number: 5 },
  { id: 'section-6', title: 'Headache', number: 6 },
  { id: 'section-7', title: 'Travel Anxiety', number: 7 },
  { id: 'section-8', title: 'Bruising/Scarring', number: 8 },
  { id: 'section-9', title: 'Other Injuries', number: 9 },
  { id: 'section-10', title: 'Treatment', number: 10 },
  { id: 'section-11', title: 'Impact on Life', number: 11 },
  { id: 'section-12', title: 'Previous History', number: 12 },
];

export default function NavigationMenu() {
  const [activeSection, setActiveSection] = useState('section-1');
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => ({
        id: item.id,
        element: document.getElementById(item.id)
      })).filter(section => section.element);

      const currentSection = sections.find(section => {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest' 
      });
      if (isMobile) {
        setIsOpen(false);
      }
    }
  };

  // Horizontal Menu
  return (
    <div className="sticky top-0 w-full bg-black/40 backdrop-blur-2xl shadow-xl border-b border-white/20 ring-1 ring-white/10 z-50">
      <nav className="container mx-auto px-2 py-2">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
          <h3 className="text-white font-semibold text-xs mr-2 whitespace-nowrap drop-shadow-lg flex-shrink-0">
            Sections:
          </h3>
          
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0",
                activeSection === item.id
                  ? "bg-teal-500 text-white shadow-lg border border-teal-400"
                  : "text-white/85 bg-white/10 hover:bg-white/20 hover:text-white border border-white/20"
              )}
            >
              <div 
                className={cn(
                  "w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold transition-colors flex-shrink-0",
                  activeSection === item.id
                    ? "bg-white text-teal-600"
                    : "bg-white/25 text-white"
                )}
              >
                {item.number}
              </div>
              <span className="text-xs drop-shadow-sm">{item.title}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}