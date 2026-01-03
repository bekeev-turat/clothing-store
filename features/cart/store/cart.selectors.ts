import { RootState } from '@/shared/store/store'

export const selectCartItems = (state: RootState) => state.cart.items

export const selectTotalItems = (state: RootState) =>
	state.cart.items.reduce((sum, item) => sum + item.quantity, 0)

export const selectSubtotal = (state: RootState) =>
	state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

export const selectTax = (state: RootState) => selectSubtotal(state) * 0.15

export const selectTotalPrice = (state: RootState) =>
	selectSubtotal(state) + selectTax(state)
