import { WorkflowForm } from "@/components/forms/workflow-form";

export default function WorkflowsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">Workflow Builder</h1>
      <WorkflowForm />
    </div>
  );
}
