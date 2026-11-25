import type { Page } from "../types/workflow";

interface Props {
  title: Page;
}

const descriptions: Record<Page, string> = {
  Dashboard: "Overview of your workspace",
  Workflows: "Manage your workflows",
  Jobs: "Manage workflow tasks",
  Runs: "Monitor workflow executions",
  Settings: "Configure your workspace",
};

export default function Header({ title }: Props) {
  return (
    <header className="header">
      <div>
        <h1>{title}</h1>
        <p>{descriptions[title]}</p>
      </div>
      <span className="workspace-label">Local workspace</span>
    </header>
  );
}
