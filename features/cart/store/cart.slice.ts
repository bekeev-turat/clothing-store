import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICartItem, IOrderAddress } from '../model/cart.types'

interface CartState {
	items: ICartItem[]
	totalItems: number
	address: IOrderAddress | null // Добавляем это
}

const initialState: CartState = {
	items: [],
	totalItems: 0,
	address: null, // Изначально адреса нет
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setCart(state, action: PayloadAction<ICartItem[]>) {
			state.items = action.payload
			// Обновляем счетчик
			state.totalItems = state.items.reduce(
				(sum, item) => sum + item.quantity,
				0,
			)
		},

		addItem(state, action: PayloadAction<ICartItem>) {
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
			state.totalItems = state.items.reduce(
				(sum, item) => sum + item.quantity,
				0,
			)
		},
		saveAddress(state, action: PayloadAction<IOrderAddress>) {
			state.address = action.payload
		},
		clearCart: (state) => {
			state.items = []
			state.totalItems = 0
		},
	},
})

export const {
	saveAddress,
	setCart,
	addItem,
	updateItemQuantity,
	removeItem,
	clearCart,
} = cartSlice.actions

export const cartReducer = cartSlice.reducer
