import { Circle } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

interface NavItem {
  title: string;
  number: number;
}

const navItems: NavItem[] = [
  { title: 'Personal Information', number: 1 },
  { title: 'Accident Details', number: 2 },
  { title: 'Neck Pain', number: 3 },
  { title: 'Shoulder Pain', number: 4 },
  { title: 'Back Pain', number: 5 },
  { title: 'Headache & Anxiety', number: 6 },
  { title: 'Bruising/Scarring', number: 7 },
  { title: 'Other Injuries', number: 8 },
  { title: 'Additional Details', number: 9 },
  { title: 'Preview & Submit', number: 10 },
];

interface AppSidebarProps {
  currentStep: number;
  onStepChange: (step: number) => void;
}

export function AppSidebar({ currentStep, onStepChange }: AppSidebarProps) {
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  const handleStepClick = (stepNumber: number) => {
    onStepChange(stepNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-white/20">
      <SidebarContent className="bg-black/40 backdrop-blur-2xl">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/85 font-semibold">
            {!isCollapsed && 'Questionnaire Steps'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.number}>
                  <SidebarMenuButton
                    onClick={() => handleStepClick(item.number)}
                    className={cn(
                      'transition-all duration-200',
                      currentStep === item.number
                        ? 'bg-teal-500 text-white hover:bg-teal-600 font-medium'
                        : 'text-white/85 hover:bg-white/20 hover:text-white'
                    )}
                    tooltip={isCollapsed ? item.title : undefined}
                  >
                    <div
                      className={cn(
                        'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors flex-shrink-0',
                        currentStep === item.number
                          ? 'bg-white text-teal-600'
                          : 'bg-white/25 text-white'
                      )}
                    >
                      {item.number}
                    </div>
                    {!isCollapsed && (
                      <span className="text-sm">{item.title}</span>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
