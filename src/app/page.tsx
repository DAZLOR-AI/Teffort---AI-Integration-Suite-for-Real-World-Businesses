import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl items-center justify-between px-6">
      <div className="max-w-2xl space-y-6">
        <p className="text-sm font-medium uppercase tracking-widest text-slate-500">AI Integration Platform</p>
        <h1 className="text-6xl font-semibold leading-tight">Next Generation AI Workflow Suite.</h1>
        <p className="text-slate-600">Launch assessment-driven AI automation blueprints and deploy smart workflows across business systems.</p>
        <div className="flex gap-3">
          <Link href="/dashboard"><Button>Open Dashboard</Button></Link>
          <Link href="/dashboard/assessment"><Button variant="outline">Run Assessment</Button></Link>
        </div>
      </div>
      <div className="hidden h-96 w-96 rounded-3xl border border-border bg-gradient-to-br from-primary/50 to-white shadow-xl md:block" />
    </main>
  );
}
