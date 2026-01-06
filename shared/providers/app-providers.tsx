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
			<Toaster
				position='top-center'
				reverseOrder={false}
				toastOptions={{
					// Общие стили для всех типов уведомлений
					style: {
						fontSize: '20px', // Размер текста
						padding: '24px', // Внутренние отступы
						maxWidth: '600px', // Максимальная ширина
						borderRadius: '12px', // Скругление
					},
					// Можно настроить размеры иконок
					success: {
						iconTheme: {
							primary: '#4ade80',
							secondary: '#fff',
						},
					},
				}}
			/>
		</>
	)
}
