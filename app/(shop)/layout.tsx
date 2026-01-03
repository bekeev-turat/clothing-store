import { Footer } from '@/shared/ui'
import { Header } from '@/features/header'
import { AppSidebar } from '@/features/app-shell/ui/app-sidebar'

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
			</div>
			<Footer />
		</div>
	)
}
