"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function AssessmentForm() {
  const [result, setResult] = useState<any>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const response = await fetch("/api/assessment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData.entries()))
    });

    setResult(await response.json());
  }

  return (
    <div className="space-y-4">
      <Card>
        <form className="space-y-3" onSubmit={onSubmit}>
          <input type="hidden" name="organizationId" value="org_demo" />
          <Input name="industry" placeholder="Industry" required />
          <Input name="businessSize" placeholder="Business Size" required />
          <Input name="toolsUsed" placeholder="Tools Used (CRM, ERP, etc.)" required />
          <Textarea name="painPoints" placeholder="Pain points" required />
          <Button type="submit">Generate AI Opportunity Map</Button>
        </form>
      </Card>
      {result && (
        <Card>
          <h3 className="font-semibold">Estimated ROI: {result.estimatedROI}</h3>
        </Card>
      )}
    </div>
  );
}
