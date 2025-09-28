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

  if (isMobile) {
    return (
      <>
        {/* Mobile Menu Button */}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full shadow-lg"
          size="sm"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />
            <div className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white/5 backdrop-blur-xl shadow-2xl border-l border-white/10 z-50 overflow-y-auto">
              <div className="p-6 pt-20">
                <h3 className="text-white/90 font-semibold text-lg mb-6">
                  Questionnaire Sections
                </h3>
                
                <div className="space-y-2">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                        activeSection === item.id
                          ? "bg-white/20 text-white shadow-md backdrop-blur-sm"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      <div className="flex items-center space-x-4">
                        <div 
                          className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors flex-shrink-0",
                            activeSection === item.id
                              ? "bg-white text-primary"
                              : "bg-white/20 text-white"
                          )}
                        >
                          {item.number}
                        </div>
                        <span className="text-sm leading-tight">{item.title}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-white/20">
                  <div className="text-white/60 text-sm text-center">
                    <div className="mb-1">Personal Injury</div>
                    <div className="font-semibold">Questionnaire</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  }

  // Desktop Menu
  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 w-48">
      <nav className="bg-white/5 backdrop-blur-xl rounded-xl shadow-2xl border border-white/10 p-2 max-h-[80vh] overflow-y-auto w-full">
        <div className="space-y-0.5">
          <h3 className="text-white/80 font-medium text-xs mb-2 px-1 whitespace-nowrap">
            Sections
          </h3>
          
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200 group",
                activeSection === item.id
                  ? "bg-white/20 text-white shadow-md scale-105 backdrop-blur-sm"
                  : "text-white/80 hover:bg-white/10 hover:text-white"
              )}
            >
              <div className="flex items-center space-x-3">
                <div 
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors flex-shrink-0",
                    activeSection === item.id
                      ? "bg-white text-primary"
                      : "bg-white/20 text-white group-hover:bg-white/30"
                  )}
                >
                  {item.number}
                </div>
                <span className="text-xs leading-tight truncate">{item.title}</span>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-white/20">
          <div className="text-white/60 text-xs text-center">
            <div className="mb-1">Personal Injury</div>
            <div className="font-semibold">Questionnaire</div>
          </div>
        </div>
      </nav>
    </div>
  );
}