import { describe, expect, it, vi } from 'vitest'
import prisma from '@/lib/prisma'
import { stockRepository } from '@/repositories/stock.repository'
import { OrderRepository } from '@/repositories/order.repository'
import { orderService } from '@/services/order.service'

// 1. Мокаем модули
vi.mock('@/lib/prisma', () => ({
	default: {
		$transaction: vi.fn(),
		order: { create: vi.fn(), findUnique: vi.fn(), update: vi.fn() },
		stock: { findUnique: vi.fn(), update: vi.fn() },
	},
}))
vi.mock('@/repositories/stock.repository')
vi.mock('@/repositories/order.repository')

// 2. Создаем типизированные моки для тестов
const mockedPrisma = vi.mocked(prisma)
const mockedStockRepo = vi.mocked(stockRepository)
const mockedOrderRepo = vi.mocked(OrderRepository)

describe('orderService.createOrder', () => {
	it('throws error if stock is insufficient', async () => {
		// Мокаем транзакцию: просто вызываем callback, передавая в него объект
		mockedPrisma.$transaction.mockImplementation(async (cb) => cb(prisma))

		// Теперь TS не будет ругаться на объект, так как используется mockedStockRepo
		mockedStockRepo.findByVariantAndSize.mockResolvedValue({
			id: 's1',
			variantId: 'v1',
			size: 'M',
			quantity: 0, // Недостаточно остатка
		})

		await expect(
			orderService.createOrder({
				userId: '1',
				items: [{ variantId: 'v1', size: 'M', price: 100, quantity: 2 }],
				address: {} as any,
			}),
		).rejects.toThrow('недостаточно')
	})

	it('creates order when stock is valid', async () => {
		mockedPrisma.$transaction.mockImplementation(async (cb) => cb(prisma))

		mockedStockRepo.findByVariantAndSize.mockResolvedValue({
			id: 's1',
			quantity: 10,
		} as any)

		// Исправляем ошибку "{ id: string }" -> "never"
		mockedOrderRepo.create.mockResolvedValue({
			id: 'order1',
			userId: '1',
			status: 'PENDING',
		} as any)

		const order = await orderService.createOrder({
			userId: '1',
			items: [{ variantId: 'v1', size: 'M', price: 100, quantity: 2 }],
			address: {} as any,
		})

		expect(order.id).toBe('order1')
		expect(mockedOrderRepo.create).toHaveBeenCalled()
	})
})
