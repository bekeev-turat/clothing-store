import { Item } from '@prisma/client'
import { PrismaClient } from './generated/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
	console.log('🌱 Starting seed...')

	// ------------------------------
	// 1) Groups
	// ------------------------------
	await prisma.group.createMany({
		data: [
			{ title: 'Футболки' },
			{ title: 'Худи' },
			{ title: 'Штаны' },
			{ title: 'Аксессуары' },
		],
		skipDuplicates: true,
	})

	const groupTshirts = await prisma.group.findFirst({
		where: { title: 'Футболки' },
	})
	const groupHoodies = await prisma.group.findFirst({
		where: { title: 'Худи' },
	})

	// ------------------------------
	// 2) Items
	// ------------------------------
	const itemsData: Omit<Item, 'id' | 'createdAt' | 'updatedAt'>[] = [
		{
			name: 'Футболка Classic',
			description: 'Качественная хлопковая футболка.',
			stock: 50,
			price: 19.99,
			availableSizes: ['S', 'M', 'L', 'XL'],
			slug: 'tshirt-classic',
			tags: ['new', 'popular'],
			gender: 'unisex',
			groupId: groupTshirts!.id,
		},
		{
			name: 'Худи Street',
			description: 'Тёплое худи оверсайз.',
			stock: 30,
			price: 39.99,
			availableSizes: ['M', 'L', 'XL', 'XXL'],
			slug: 'hoodie-street',
			tags: ['warm', 'top'],
			gender: 'male',
			groupId: groupHoodies!.id,
		},
	]

	const items = []
	for (const item of itemsData) {
		const created = await prisma.item.create({ data: item })
		items.push(created)
	}

	// ------------------------------
	// 3) Item images
	// ------------------------------
	await prisma.itemImage.createMany({
		data: [
			{ url: '/images/tshirt1.png', itemId: items[0].id },
			{ url: '/images/tshirt2.png', itemId: items[0].id },

			{ url: '/images/hoodie1.png', itemId: items[1].id },
			{ url: '/images/hoodie2.png', itemId: items[1].id },
		],
	})

	// ------------------------------
	// 4) Accounts
	// NOTE: passwordHash должен быть уже хэшем!
	// ------------------------------
	await prisma.account.createMany({
		data: [
			{
				username: 'admin',
				email: 'admin@example.com',
				passwordHash: '$2a$10$hashhashhash', // ← вставить реальный bcrypt-хэш
				role: 'ADMIN',
			},
			{
				username: 'user1',
				email: 'user1@example.com',
				passwordHash: '$2a$10$hashhashhash',
				role: 'MEMBER',
			},
		],
		skipDuplicates: true,
	})

	console.log('🌱 Seed completed!')
}

main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
