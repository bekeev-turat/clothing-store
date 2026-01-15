import { describe, it, expect } from '@jest/globals'
import { cartReducer, addItem, removeItem } from './cart.slice'

describe('cart slice', () => {
	it('adds item to cart', () => {
		const state = cartReducer(
			undefined,
			addItem({
				id: '1',
				title: 'product 1',
				price: 100,
				quantity: 1,
				image: '/dds.jpg',
				slug: 'product-sdfe-32',
				size: 'L',
			}),
		)

		expect(state.items.length).toBe(1)
	})

	it('removes item from cart', () => {
		const state = cartReducer(
			{
				items: [
					{
						id: '1',
						title: 'product 1',
						price: 100,
						quantity: 1,
						image: '/dds.jpg',
						slug: 'product-sdfe-32',
						size: 'L',
					},
				],
				totalItems: 1,
				address: null,
			},
			removeItem({ id: '1', size: 'L' }),
		)

		expect(state.items.length).toBe(0)
	})
})
