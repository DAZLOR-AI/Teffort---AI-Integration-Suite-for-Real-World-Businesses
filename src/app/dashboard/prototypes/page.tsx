import { PrototypeForm } from "@/components/forms/prototype-form";

export default function PrototypesPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-semibold">AI Prototype Generator</h1>
      <PrototypeForm />
    </div>
  );
}
