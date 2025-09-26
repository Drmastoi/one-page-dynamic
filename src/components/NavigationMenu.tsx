import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

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
    }
  };

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
      <nav className="bg-nav/95 backdrop-blur-sm rounded-lg shadow-lg border border-nav/20 p-4 max-h-[80vh] overflow-y-auto">
        <div className="space-y-1">
          <h3 className="text-nav-foreground font-semibold text-sm mb-3 px-2">
            Questionnaire Sections
          </h3>
          
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 hover:bg-nav-hover group",
                activeSection === item.id
                  ? "bg-nav-active text-white shadow-md scale-105"
                  : "text-nav-foreground hover:text-white"
              )}
            >
              <div className="flex items-center space-x-3">
                <div 
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
                    activeSection === item.id
                      ? "bg-white text-nav-active"
                      : "bg-nav-foreground/20 text-nav-foreground group-hover:bg-white group-hover:text-nav-hover"
                  )}
                >
                  {item.number}
                </div>
                <span className="text-xs leading-tight">{item.title}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-nav-foreground/20">
          <div className="text-nav-foreground/70 text-xs text-center">
            <div className="mb-1">Personal Injury</div>
            <div className="font-semibold">Questionnaire</div>
          </div>
        </div>
      </nav>
    </div>
  );
}