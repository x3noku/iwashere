import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
    server: {
        POSTGRES_PRISMA_URL: z.string().url(),
        POSTGRES_URL_NON_POOLING: z.string().url(),
        NEXTAUTH_SECRET: process.env.NODE_ENV === 'production' ? z.string() : z.string().optional(),
        NEXTAUTH_URL: z.preprocess(
            str => process.env.VERCEL_URL ?? str,
            process.env.VERCEL ? z.string() : z.string().url()
        ),
        TELEGRAM_SECRET: z.string(),
    },
    client: {
        NEXT_PUBLIC_ENV: z.enum(['development', 'test', 'production']).default('development'),
        NEXT_PUBLIC_REST_URL: z.preprocess(
            str => process.env.VERCEL_URL ?? str,
            process.env.VERCEL ? z.string() : z.string().url().optional()
        ),
        NEXT_PUBLIC_TELEGRAM_BOT: z.string().endsWith('bot'),
        NEXT_PUBLIC_SANITY_PROJECT_ID: z.string(),
        NEXT_PUBLIC_SANITY_DATASET: z.string(),
        NEXT_PUBLIC_SANITY_API_VERSION: z.string(),
        NEXT_PUBLIC_SANITY_USE_CDN: z
            .string()
            .refine(s => s === 'true' || s === 'false')
            .transform(s => s === 'true'),
    },
    runtimeEnv: {
        NEXT_PUBLIC_ENV: process.env.NODE_ENV,
        NEXT_PUBLIC_REST_URL: process.env.NEXT_PUBLIC_REST_URL,

        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,

        NEXT_PUBLIC_TELEGRAM_BOT: process.env.NEXT_PUBLIC_TELEGRAM_BOT,
        TELEGRAM_SECRET: process.env.TELEGRAM_SECRET,

        POSTGRES_PRISMA_URL: process.env.POSTGRES_PRISMA_URL,
        POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,

        NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
        NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
        NEXT_PUBLIC_SANITY_API_VERSION: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
        NEXT_PUBLIC_SANITY_USE_CDN: process.env.NEXT_PUBLIC_SANITY_USE_CDN,
    },
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
    emptyStringAsUndefined: true,
});
