import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartItem } from './cart.types'

interface CartState {
	items: CartItem[]
	totalItems: number
}

const initialState: CartState = {
	items: [],
	totalItems: 0,
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setCart(state, action: PayloadAction<CartItem[]>) {
			state.items = action.payload
			// Обновляем счетчик
			state.totalItems = state.items.reduce(
				(sum, item) => sum + item.quantity,
				0,
			)
		},

		addItem(state, action: PayloadAction<CartItem>) {
			const existing = state.items.find(
				(item) =>
					item.id === action.payload.id && item.size === action.payload.size,
			)

			if (existing) {
				existing.quantity += action.payload.quantity
			} else {
				state.items.push(action.payload)
			}
			// Здесь обновление счетчика у вас было — это правильно
			state.totalItems = state.items.reduce(
				(sum, item) => sum + item.quantity,
				0,
			)
		},

		updateItemQuantity(
			state,
			action: PayloadAction<{ id: string; size: string; quantity: number }>,
		) {
			const item = state.items.find(
				(i) => i.id === action.payload.id && i.size === action.payload.size,
			)

			if (item) {
				item.quantity = action.payload.quantity
				// Нужно обновить общий счетчик после изменения количества
				state.totalItems = state.items.reduce(
					(sum, item) => sum + item.quantity,
					0,
				)
			}
		},

		removeItem(state, action: PayloadAction<{ id: string; size: string }>) {
			state.items = state.items.filter(
				(item) =>
					!(item.id === action.payload.id && item.size === action.payload.size),
			)
			// Обновляем счетчик после удаления
			state.totalItems = state.items.reduce(
				(sum, item) => sum + item.quantity,
				0,
			)
		},

		clearCart: () => initialState, // Самый простой способ сброса
	},
})

export const { setCart, addItem, updateItemQuantity, removeItem, clearCart } =
	cartSlice.actions

export const cartReducer = cartSlice.reducer
