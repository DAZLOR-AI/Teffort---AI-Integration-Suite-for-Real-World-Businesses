import { Card } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">Organization Settings</h1>
      <Card>
        <p className="text-sm">Role model: Owner, Admin, Member. Billing and policy controls are ready for Stripe integration.</p>
      </Card>
    </div>
  );
}
