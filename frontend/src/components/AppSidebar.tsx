import {
  LayoutDashboard,
  Workflow,
  ListTodo,
  History,
  Settings
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";

import type { Page } from "@/types/workflow";

const navItems = [
  { title: "Dashboard", icon: LayoutDashboard },
  { title: "Workflows", icon: Workflow },
  { title: "Jobs", icon: ListTodo },
  { title: "Runs", icon: History },
  { title: "Settings", icon: Settings }
] satisfies { title: Page; icon: React.ComponentType }[];

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function AppSidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex h-10 items-center gap-3 px-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Workflow className="size-5" />
          </div>
          <span className="text-base font-semibold tracking-tight group-data-[collapsible=icon]:hidden">
            Worchestra
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map(({ title, icon: Icon }) => (
              <SidebarMenuItem key={title}>
                <SidebarMenuButton
                  isActive={currentPage === title}
                  tooltip={title}
                  onClick={() => onNavigate(title)}
                >
                  <Icon />
                  <span>{title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
