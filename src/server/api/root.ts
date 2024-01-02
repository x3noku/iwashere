import { createTRPCRouter } from '../trpc';
import { postRouter } from './routers/post';
import { productRouter } from './routers/product';

export const appRouter = createTRPCRouter({
    post: postRouter,
    product: productRouter,
});

export type AppRouter = typeof appRouter;
