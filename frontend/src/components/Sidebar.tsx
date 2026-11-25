import type { Page } from "../types/workflow";

interface Props {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const pages: Page[] = ["Dashboard", "Workflows", "Jobs", "Runs", "Settings"];

export default function Sidebar({ currentPage, onNavigate }: Props) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-icon">W</span>
        <span>Worchestra</span>
      </div>

      <p className="nav-label">WORKSPACE</p>
      <nav>
        {pages.map((page) => (
          <button
            key={page}
            className={`nav-item ${currentPage === page ? "active" : ""}`}
            onClick={() => onNavigate(page)}
          >
            {page}
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">Local workspace</div>
    </aside>
  );
}
