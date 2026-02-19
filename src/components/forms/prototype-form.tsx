"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function PrototypeForm() {
  const [result, setResult] = useState<any>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/prototypes", {
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
          <Input name="title" placeholder="Prototype title" required />
          <Textarea name="desiredAutomation" placeholder="Describe desired automation" required />
          <Button type="submit">Generate Prototype</Button>
        </form>
      </Card>
      {result && (
        <Card>
          <p className="font-semibold">Architecture</p>
          <p className="text-sm">{result.technicalArchitecture}</p>
          <a
            className="mt-3 inline-block text-sm underline"
            href={`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(result.exportJson, null, 2))}`}
            download={`${result.title}.json`}
          >
            Export JSON
          </a>
        </Card>
      )}
    </div>
  );
}
