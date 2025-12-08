export const revalidate = 60

import prisma from '@/lib/prisma'

interface Props {
	searchParams: {
		page?: string
	}
}

export default async function Home({ searchParams }: Props) {
	const items = await prisma.item.findMany()

	return <div>items: {items.length}</div>
}
