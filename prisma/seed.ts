import { ItemSize, PrismaClient } from './generated/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { ItemGender } from './generated/client'
import { itemsFemaleData, itemsMaleData } from './seed-item-data'
import { groups, groupsData } from './seed-group-data'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
	console.log('🌱 Starting seed...')

	// ------------------------------
	// 1) Groups
	// ------------------------------
	console.log('🌱 Seeding groups...')

	for (const group of groupsData) {
		const upserted = await prisma.group.upsert({
			where: { slug: group.slug },
			update: {},
			create: group,
		})
		groups[group.slug] = upserted
	}
	// ------------------------------
	// 2) Items
	// ------------------------------
	console.log('🌱 Seeding items...')
	const itemsData = [...itemsFemaleData, ...itemsMaleData]
	for (const item of itemsData) {
		const { variants, groupSlug, ...itemBase } = item

		const group = groups[groupSlug]

		if (!group) {
			throw new Error(
				`❌ Group with slug "${groupSlug}" not found for item "${itemBase.slug}"`,
			)
		}
		await prisma.item.upsert({
			where: { slug: itemBase.slug },
			update: {},
			create: {
				...itemBase,
				gender: itemBase.gender as ItemGender,
				group: { connect: { slug: groupSlug } },
				modelSize: itemBase.modelSize as ItemSize,
				variants: {
					create: variants.map((v) => ({
						color: v.color,
						availableSizes: v.availableSizes as ItemSize[],
						images: {
							create: v.images.map((img) => ({ url: img })),
						},
						stock: {
							create: v.stock.map((s) => ({
								size: s.size as ItemSize,
								quantity: s.quantity,
							})),
						},
					})),
				},
			},
		})
	}

	// ------------------------------
	// 3) Accounts
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
