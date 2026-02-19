import { describe, expect, test } from "vitest";
import { canManage } from "@/lib/rbac/roles";
import { Role } from "@prisma/client";

describe("rbac", () => {
  test("owner/admin can manage", () => {
    expect(canManage(Role.OWNER)).toBe(true);
    expect(canManage(Role.ADMIN)).toBe(true);
    expect(canManage(Role.MEMBER)).toBe(false);
  });
});
