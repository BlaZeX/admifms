import { defineCollection, z } from 'astro:content';

const fileReference = z.string().refine((value) => value.startsWith('/') || value.startsWith('https://') || value.startsWith('http://'), 'Use an absolute URL or a root-relative path.');

const notices = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.string(),
    description: z.string(),
    fileUrl: fileReference.optional(),
    isImportant: z.boolean().optional()
  })
});

const events = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    location: z.string(),
    category: z.string(),
    description: z.string(),
    image: z.string().optional(),
    status: z.enum(['upcoming', 'past'])
  })
});

const faculty = defineCollection({
  schema: z.object({
    name: z.string(),
    designation: z.string(),
    qualification: z.string(),
    email: z.string().email(),
    areas: z.array(z.string()),
    profileImage: z.string().optional(),
    bio: z.string(),
    publications: z.array(z.string()).optional()
  })
});

const publications = defineCollection({
  schema: z.object({
    title: z.string(),
    authors: z.string(),
    year: z.number(),
    journal: z.string(),
    type: z.string(),
    link: z.string().url().optional()
  })
});

const downloads = defineCollection({
  schema: z.object({
    title: z.string(),
    category: z.string(),
    date: z.coerce.date(),
    fileUrl: fileReference,
    description: z.string().optional()
  })
});

const gallery = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.string(),
    description: z.string(),
    coverImage: z.string().optional(),
    images: z.array(z.string()).optional()
  })
});

const placementReports = defineCollection({
  schema: z.object({
    title: z.string(),
    year: z.number(),
    category: z.string(),
    fileUrl: fileReference,
    description: z.string().optional(),
    approved: z.boolean()
  })
});

export const collections = { notices, events, faculty, publications, downloads, gallery, placementReports };
