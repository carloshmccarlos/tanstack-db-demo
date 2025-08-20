import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "~/lib/auth/auth-middleware";

export const getUserId = createServerFn({
    method: "GET",
})
    .middleware([authMiddleware])
    .handler(async ({ context }) => {
        // React Query v5 disallows undefined data; return null when absent
        return context?.user?.id ?? null;
    });

export const getAvatar = createServerFn({
    method: "GET",
})
    .middleware([authMiddleware])
    .handler(async ({ context }) => {
        // Avoid undefined to prevent query errors
        return context?.user?.image ?? null;
    });

export const getUserSession = createServerFn({
    method: "GET",
})
    .middleware([authMiddleware])
    .handler(async ({ context }) => {
        // React Query v5 disallows undefined data; return null when absent
        return context ?? null;
    });
