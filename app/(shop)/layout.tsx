import { Footer } from '@/shared/ui'
import { Header } from '@/features/header'
import { AppSidebar } from '@/features/app-shell/ui/app-sidebar'

import { Suspense } from 'react'
import { StripeToastHandler } from '@/features/order/ui/stripe-toast-handler'

export default function MainLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<div className='app-container min-h-screen flex flex-col'>
			<Header />
			<div className='flex flex-1'>
				<AppSidebar />
				<section className='flex-1 p-4 sm:p-8'>{children}</section>

				{/* Suspense обязателен при использовании useSearchParams в App Router */}
				<Suspense fallback={null}>
					<StripeToastHandler />
				</Suspense>
			</div>
			<Footer />
		</div>
	)
}
