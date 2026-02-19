import { MetricCard } from "@/components/dashboard/metric-card";
import { Card } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold">Overview</h1>
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard title="Active Workflows" value="08" subtitle="3 added this week" />
        <MetricCard title="AI Calls (30d)" value="12,420" subtitle="Billing-ready tracking enabled" />
        <MetricCard title="Estimated Savings" value="$24,800" subtitle="Based on deployed automations" />
      </div>
      <Card>
        <h2 className="text-lg font-semibold">Recent Workflows</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-600">
          <li>Lead qualification + CRM sync</li>
          <li>Invoice extraction + ERP post</li>
          <li>Customer support triage routing</li>
        </ul>
      </Card>
    </div>
  );
}
