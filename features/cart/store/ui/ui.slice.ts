import { createSlice } from '@reduxjs/toolkit'

interface UiState {
	sideMenuOpened: boolean
}

const initialState: UiState = {
	sideMenuOpened: false,
}

const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		openMenu(state) {
			state.sideMenuOpened = true
		},
		closeMenu(state) {
			state.sideMenuOpened = false
		},
	},
})

export const { openMenu, closeMenu } = uiSlice.actions
export const uiReducer = uiSlice.reducer
