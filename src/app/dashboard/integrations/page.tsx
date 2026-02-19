import { Card } from "@/components/ui/card";

export default function IntegrationsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">Integrations</h1>
      <Card>
        <p className="font-medium">Placeholder OAuth architecture</p>
        <ul className="mt-2 list-disc pl-5 text-sm text-slate-600">
          <li>Store provider metadata and scopes</li>
          <li>Secure client credentials in secret manager</li>
          <li>Token exchange callback endpoint in /api/integrations/oauth/callback (next phase)</li>
        </ul>
      </Card>
    </div>
  );
}
