import { SetMetadata } from "@nestjs/common";
import { UserRole } from "src/users/entities/user.entity";

// 참고: https://stackoverflow.com/questions/55377365/what-does-keyof-typeof-mean-in-typescript
export type AllowedRoles = keyof typeof UserRole | "Any"

export const Role = (roles:AllowedRoles[]) => SetMetadata("roles", roles)