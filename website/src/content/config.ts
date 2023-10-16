import { defineCollection, z } from 'astro:content';
const aboutCollection = defineCollection({
    type: 'content'
    // schema: z.object({
    //      paragraphs: z.array(z.string())
    // })
});

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
    schema: ({ image }) => z.object({
        name: z.string(),
        description: z.array(z.string()),
        url: z.string().url(),
        relatedLinks: z.array(z.object({
            text: z.string(),
            url: z.string().url(),
            iconType: z.string()
        })).optional(),
        tags: z.array(z.string()),
        picture: image().refine((img) => img.width >= 100, {
                message: "La imagen debe de tener al menos 100 píxeles de ancho!",
        }),
    }),
});

export const collections = {
    'experiences': experienceCollection,
    'projects': projectCollection,
    'about': aboutCollection,
};