import { configureStore } from '@reduxjs/toolkit'
import { cartReducer } from '@/features/cart/store/cart.slice'
import { uiReducer } from '@/features/cart/store/ui/ui.slice'

export const store = configureStore({
	reducer: {
		ui: uiReducer,
		cart: cartReducer,
	},
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
