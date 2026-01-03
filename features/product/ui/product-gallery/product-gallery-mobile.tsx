import Image from 'next/image'
import clsx from 'clsx'

interface Props {
	images: string[]
	title: string
	mainRef: (node: HTMLElement | null) => void
	selectedIndex: number
	onDotClick: (index: number) => void
	className?: string
}

export function ProductGalleryMobile({
	images,
	title,
	mainRef,
	selectedIndex,
	onDotClick,
	className,
}: Props) {
	return (
		<div className={clsx('w-full', className)}>
			<div ref={mainRef} className='overflow-hidden'>
				<div className='flex'>
					{images.map((img) => (
						<div key={img} className='relative w-full h-[420px] shrink-0'>
							<Image
								src={img}
								alt={title}
								fill
								quality={85}
								className='object-contain rounded-xl'
							/>
						</div>
					))}
				</div>
			</div>

			<div className='mt-3 flex justify-center gap-2'>
				{images.map((_, i) => (
					<button
						key={i}
						onClick={() => onDotClick(i)}
						className={clsx(
							'h-2 w-2 rounded-full transition',
							selectedIndex === i ? 'bg-black' : 'bg-black/30',
						)}
					/>
				))}
			</div>
		</div>
	)
}
