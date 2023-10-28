import { createTRPCRouter } from "./trpc";
import { stepperFormRouter } from "./routers/stepper";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  stepper: stepperFormRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
