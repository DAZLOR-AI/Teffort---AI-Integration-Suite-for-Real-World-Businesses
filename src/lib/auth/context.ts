import { prisma } from "@/lib/db/prisma";

export async function getOrCreateDemoContext() {
  const user = await prisma.user.upsert({
    where: { email: "owner@teffort.ai" },
    update: {},
    create: { email: "owner@teffort.ai", name: "Owner User" }
  });

  const organization = await prisma.organization.upsert({
    where: { id: "org_demo" },
    update: {},
    create: { id: "org_demo", name: "Teffort Demo Org" }
  });

  await prisma.membership.upsert({
    where: { userId_organizationId: { userId: user.id, organizationId: organization.id } },
    update: { role: "OWNER" },
    create: { userId: user.id, organizationId: organization.id, role: "OWNER" }
  });

  return { user, organization };
}
