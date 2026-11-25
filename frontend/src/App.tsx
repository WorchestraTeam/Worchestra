import { useState } from "react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import AppSidebar from "@/components/AppSidebar";
import type { Page } from "@/types/workflow";

const pages: Record<Page, { description: string; empty: string }> = {
  Dashboard: {
    description: "Overview of your workspace.",
    empty: "Your workspace is ready.",
  },
  Workflows: {
    description: "Manage your workflows.",
    empty: "No workflows yet.",
  },
  Jobs: {
    description: "Manage workflow tasks.",
    empty: "No jobs yet.",
  },
  Runs: {
    description: "View execution history.",
    empty: "No runs yet.",
  },
  Settings: {
    description: "Configure your workspace.",
    empty: "Settings will be available here.",
  },
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("Dashboard");
  const page = pages[currentPage];

  return (
    <SidebarProvider>
      <AppSidebar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />

      <SidebarInset>
        <header className="flex h-16 items-center gap-3 border-b px-6">
          <SidebarTrigger />
          <Separator orientation="vertical" className="h-6" />

          <div>
            <h1 className="text-lg font-semibold">{currentPage}</h1>
            <p className="text-sm text-muted-foreground">
              {page.description}
            </p>
          </div>
        </header>

        <main className="p-6">
          <section className="rounded-lg border border-dashed p-12 text-center">
            <p className="text-muted-foreground">{page.empty}</p>
          </section>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
