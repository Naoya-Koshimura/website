import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
		}),
});

const games = defineCollection({
	loader: glob({ base: './src/content/games', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			coverImage: image().optional(),
			heroImage: image().optional(),
			// 文字列に変更（"2026年冬", "未定" などに対応するため）
			releaseDate: z.string().optional(),
			status: z.enum(['発売中', '開発中', 'プロトタイプ']).default('開発中'),
			platforms: z.array(z.string()).optional(),
			links: z.object({
				steam: z.string().url().optional(),
				itch: z.string().url().optional(),
				ios: z.string().url().optional(),
				android: z.string().url().optional(),
				other: z.string().url().optional(),
			}).optional(),
		}),
});

export const collections = { blog, games };
