'use client'
import { SessionProvider } from 'next-auth/react'
import { Provider as StoreReduxProvider } from 'react-redux'
import { store } from '@/shared/store/store'
import { Toaster } from 'react-hot-toast'

interface Props {
	children: React.ReactNode
}

export const AppProviders = ({ children }: Props) => {
	return (
		<>
			<SessionProvider>
				<StoreReduxProvider store={store}>{children}</StoreReduxProvider>
			</SessionProvider>
			{/* <Toaster /> */}
		</>
	)
}
