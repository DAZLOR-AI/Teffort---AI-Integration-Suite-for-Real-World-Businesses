"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export function WorkflowForm() {
  const [workflows, setWorkflows] = useState<any[]>([]);

  async function createWorkflow(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fd = new FormData(event.currentTarget);
    const body = {
      organizationId: "org_demo",
      name: fd.get("name"),
      trigger: { source: fd.get("trigger") },
      aiStep: { model: "gpt-4o-mini", objective: fd.get("aiStep") },
      actionStep: { destination: fd.get("action") }
    };

    const res = await fetch("/api/workflows", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const workflow = await res.json();
    setWorkflows((prev) => [workflow, ...prev]);
  }

  async function toggleWorkflow(id: string, status: "ACTIVE" | "INACTIVE") {
    await fetch("/api/workflows", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status })
    });
    setWorkflows((prev) => prev.map((workflow) => (workflow.id === id ? { ...workflow, status } : workflow)));
  }

  return (
    <div className="space-y-4">
      <Card>
        <form className="grid gap-3 md:grid-cols-3" onSubmit={createWorkflow}>
          <Input name="name" placeholder="Workflow name" required />
          <Input name="trigger" placeholder="Trigger" required />
          <Input name="aiStep" placeholder="AI step" required />
          <Input name="action" placeholder="Action" required />
          <Button type="submit">Save Workflow</Button>
        </form>
      </Card>
      <div className="space-y-3">
        {workflows.map((workflow) => (
          <Card key={workflow.id} className="flex items-center justify-between">
            <div>
              <p className="font-semibold">{workflow.name}</p>
              <p className="text-xs text-slate-500">Mock execution ready</p>
            </div>
            <Switch checked={workflow.status === "ACTIVE"} onCheckedChange={(on) => toggleWorkflow(workflow.id, on ? "ACTIVE" : "INACTIVE")} />
          </Card>
        ))}
      </div>
    </div>
  );
}
