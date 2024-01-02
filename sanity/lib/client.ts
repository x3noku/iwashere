import { createClient } from 'next-sanity';
import { env } from '~/shared/lib';

export const client = createClient({
    apiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION,
    dataset: env.NEXT_PUBLIC_SANITY_DATASET,
    projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    useCdn: env.NEXT_PUBLIC_SANITY_USE_CDN,
});
