import Link from "next/link";
import { BarChart3, Brain, Cable, LayoutDashboard, Settings, Workflow } from "lucide-react";

const links = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/assessment", label: "Assessment", icon: Brain },
  { href: "/dashboard/prototypes", label: "Prototypes", icon: BarChart3 },
  { href: "/dashboard/workflows", label: "Workflows", icon: Workflow },
  { href: "/dashboard/integrations", label: "Integrations", icon: Cable },
  { href: "/dashboard/settings", label: "Settings", icon: Settings }
];

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-border bg-white p-4">
      <h2 className="mb-6 text-lg font-bold">Teffort-AI</h2>
      <nav className="space-y-2">
        {links.map(({ href, label, icon: Icon }) => (
          <Link key={href} href={href} className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted">
            <Icon size={16} /> {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
