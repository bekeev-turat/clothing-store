import Image from 'next/image'
import { cn } from '@/shared/lib/utils'

interface Props {
	images: string[]
	title: string
	mainRef: (node: HTMLElement | null) => void
	thumbsRef: (node: HTMLElement | null) => void
	selectedIndex: number
	onThumbClick: (index: number) => void
	className?: string
}

export function ProductGalleryDesktop({
	images,
	title,
	mainRef,
	thumbsRef,
	selectedIndex,
	onThumbClick,
	className,
}: Props) {
	return (
		<div className={cn('flex gap-4 h-[700px]', className)}>
			{/* thumbs */}
			<div ref={thumbsRef} className='w-36 overflow-hidden'>
				<div className='flex flex-col gap-3'>
					{images.map((img, i) => (
						<button
							key={img}
							onClick={() => onThumbClick(i)}
							className={cn(
								'relative aspect-square w-30 rounded-xl overflow-hidden border transition',
								selectedIndex === i ? 'border-primary' : 'border-transparent',
							)}
						>
							<Image
								src={img}
								alt={title}
								fill
								sizes='80px'
								quality={50}
								className='object-contain'
							/>
						</button>
					))}
				</div>
			</div>

			{/* main */}
			<div ref={mainRef} className='overflow-hidden rounded-2xl w-full'>
				<div className='flex'>
					{images.map((img, index) => (
						<div key={img} className='shrink-0 w-full h-[700px] relative'>
							<Image
								src={img}
								alt={title}
								fill
								quality={90}
								sizes='(min-width: 1024px) 600px, 90vw'
								priority={index === 0}
								className='object-contain'
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
