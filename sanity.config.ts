import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { schema } from '~/sanity/model';
import { env } from '~/shared/lib';

export default defineConfig({
    basePath: '/studio',
    projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: env.NEXT_PUBLIC_SANITY_DATASET,
    schema,
    plugins:
        env.NEXT_PUBLIC_ENV === 'development'
            ? [deskTool(), visionTool({ defaultApiVersion: env.NEXT_PUBLIC_SANITY_API_VERSION })]
            : [deskTool()],
});
