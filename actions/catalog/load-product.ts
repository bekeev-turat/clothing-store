'use server'

import prisma from '@/lib/prisma'

export async function loadProduct(slug: string) {
	if (!slug) return null

	try {
		const entity = await prisma.item.findUnique({
			where: { slug },
			include: {
				variants: {
					include: {
						images: { select: { url: true } },
					},
				},
			},
		})

		if (!entity) return null

		return {
			...entity,
			images: entity.variants.flatMap((v) => v.images.map((i) => i.url)),
		}
	} catch {
		throw new Error('PRODUCT_LOAD_FAILED')
	}
}
