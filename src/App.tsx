import { useEffect, useState } from "react";
import { Sidebar, Topbar, Toasts } from "./components/ui";
import { StoreProvider, useStore } from "./state/store";
import { Dashboard, Leads, LeadDetail, Pipeline, Contacts, Portfolio, Viewings, Deals, Comms, Marketing, Reports, Team, Integrations, RERA, Rental, Automation, Audit, Settings, AIChatWidget } from "./pages/all";

function Router() {
  const { s } = useStore();
  const page = s.route.page;
  useEffect(() => { window.scrollTo({ top: 0 }); }, [page, s.route.param]);
  switch (page) {
    case "leads": return <Leads />;
    case "lead": return <LeadDetail />;
    case "pipeline": return <Pipeline />;
    case "contacts": return <Contacts />;
    case "portfolio": return <Portfolio />;
    case "viewings": return <Viewings />;
    case "deals": return <Deals />;
    case "comms": return <Comms />;
    case "marketing": return <Marketing />;
    case "reports": return <Reports />;
    case "team": return <Team />;
    case "integrations": return <Integrations />;
    case "rera": return <RERA />;
    case "rental": return <Rental />;
    case "automation": return <Automation />;
    case "audit": return <Audit />;
    case "settings": return <Settings />;
    default: return <Dashboard />;
  }
}

function Shell() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="bg-weave flex min-h-screen">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Topbar onMenu={() => setMenuOpen(true)} />
        <main className="flex-1 px-4 py-5 lg:px-6">
          <Router />
          <footer className="mt-8 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-4 text-[10.5px] font-semibold text-slate2">
            <p>Leads Logic Estate CRM — Dubai real estate sales operating system</p>
            <p className="num">AED · Asia/Dubai · {new Date().getFullYear()} · Phase 6 complete</p>
          </footer>
        </main>
      </div>
      <AIChatWidget />
      <Toasts />
    </div>
  );
}

export default function App() {
  return <StoreProvider><Shell /></StoreProvider>;
}
