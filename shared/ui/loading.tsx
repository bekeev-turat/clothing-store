import { Skeleton } from './skeleton'

export function LoadingPage() {
	return (
		<div className='max-w-7xl mx-auto px-4 py-8'>
			<div className='flex flex-col md:flex-row gap-8'>
				<Skeleton className='w-full md:w-1/2 aspect-square rounded-xl' />

				<div className='flex-1 space-y-6 py-2'>
					<Skeleton className='h-10 w-3/4' />
					<Skeleton className='h-8 w-1/4' />

					<div className='space-y-3'>
						<Skeleton className='h-4 w-full' />
						<Skeleton className='h-4 w-full' />
						<Skeleton className='h-4 w-2/3' />
					</div>

					<div className='flex gap-4 mt-8'>
						<Skeleton className='h-12 w-full' />
						<Skeleton className='h-12 w-12 shrink-0' />
					</div>

					<div className='pt-10 space-y-4 border-t border-border'>
						<Skeleton className='h-4 w-1/2' />
						<Skeleton className='h-4 w-1/3' />
					</div>
				</div>
			</div>
		</div>
	)
}
