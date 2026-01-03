'use server'

import prisma from '@/lib/prisma'

export async function getProductAvailability(slug: string) {
	if (!slug) return 0

	try {
		const item = await prisma.item.findUnique({
			where: { slug },
			include: {
				variants: {
					select: { stock: true },
				},
			},
		})

		const total =
			item?.variants.reduce((sum, v) => {
				if (!v.stock) return sum
				return (
					sum +
					Object.values(v.stock as Record<string, number>).reduce(
						(a, b) => a + b,
						0,
					)
				)
			}, 0) ?? 0

		return total
	} catch {
		throw new Error('STOCK_LOOKUP_FAILED')
	}
}
