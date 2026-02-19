import { Role } from "@prisma/client";

export function canManage(role: Role) {
  return role === Role.OWNER || role === Role.ADMIN;
}
