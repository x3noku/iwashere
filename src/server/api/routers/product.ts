import { groq } from 'next-sanity';
import { createTRPCRouter, publicProcedure } from '../../trpc';

export const productRouter = createTRPCRouter({
    getAll: publicProcedure.query(async ({ ctx }) => {
        return await ctx.sanity.fetch<Array<{ _id: string; name: string; images: string[] }>>(groq`
            *[_type == "product"]{
                _id,
                name,
                "images": image[].asset->url
            }
        `);
    }),
});
