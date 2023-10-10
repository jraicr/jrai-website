import { defineCollection, z } from 'astro:content';

const experienceCollection = defineCollection({
    type: 'data',
    schema: z.object({
        dates: z.string(),
        lastRole: z.string(),
        oldRole: z.array(z.string()).optional(),
        company: z.string(),
        url: z.string().url(),
        description: z.array(z.string()),

        relatedLinks: z.array(z.object({
            text: z.string(),
            url: z.string().url(),
            iconType: z.string()
        })).optional(),

        tags: z.array(z.string())
    })
});

const projectCollection = defineCollection({
    type: 'data',
    schema: z.object({
        name: z.string(),
        description: z.array(z.string()),

        relatedLinks: z.array(z.object({
            text: z.string(),
            url: z.string().url(),
            iconType: z.string()
        })).optional(),

        tags: z.array(z.string()),
        image: z.string(),
    })
})

export const collections = {
    'experiences': experienceCollection
};