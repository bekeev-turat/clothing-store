import { describe, expect, it, vi } from 'vitest'
import prisma from '@/lib/prisma'
import {
	stockRepository,
	type StockWithFields,
} from '@/repositories/stock.repository'
import { OrderRepository } from '@/repositories/order.repository'
import { orderService } from '@/services/order.service'
import { type IAddress } from '@/domain/order/types'

const USER_ADDRESS = {
	firstName: 'ded',
	lastName: 'dse',
	address: 'jndsesac',
	city: 'Бишкек',
	zip: '720010',
	phone: '+996997052000',
	address2: null,
} as IAddress

vi.mock('@/lib/prisma', () => ({
	default: {
		$transaction: vi.fn(),
		order: { create: vi.fn(), findUnique: vi.fn(), update: vi.fn() },
		stock: { findUnique: vi.fn(), update: vi.fn() },
	},
}))
vi.mock('@/repositories/stock.repository')
vi.mock('@/repositories/order.repository')

const mockedPrisma = vi.mocked(prisma)
const mockedStockRepo = vi.mocked(stockRepository)
const mockedOrderRepo = vi.mocked(OrderRepository)

describe('orderService.createOrder', () => {
	it('throws error if stock is insufficient', async () => {
		mockedPrisma.$transaction.mockImplementation(async (cb) => cb(prisma))

		mockedStockRepo.findByVariantAndSize.mockResolvedValue({
			id: 's1',
			variantId: 'v1',
			size: 'M',
			quantity: 0,
		})

		await expect(
			orderService.createOrder({
				userId: '1',
				items: [{ variantId: 'v1', size: 'M', price: 100, quantity: 2 }],
				address: USER_ADDRESS,
			}),
		).rejects.toThrow('недостаточно')
	})

	it('creates order when stock is valid', async () => {
		mockedPrisma.$transaction.mockImplementation(async (cb) => cb(prisma))

		mockedStockRepo.findByVariantAndSize.mockResolvedValue({
			id: 's1',
			quantity: 10,
		} as StockWithFields)

		mockedOrderRepo.create.mockResolvedValue({
			id: 'order1',
			userId: '1',
			status: 'PENDING',
			createdAt: new Date(),
			updatedAt: new Date(),
			items: [
				{
					id: '445',
					price: 4110,
					variantId: '852006',
					size: 'L',
					quantity: 2,
					orderId: '550',
				},
			],
			...USER_ADDRESS,
			totalAmount: 200,
		})

		const order = await orderService.createOrder({
			userId: '1',
			items: [{ variantId: 'v1', size: 'M', price: 100, quantity: 2 }],
			address: USER_ADDRESS,
		})

		expect(order.id).toBe('order1')
		expect(mockedOrderRepo.create).toHaveBeenCalled()
	})
})
