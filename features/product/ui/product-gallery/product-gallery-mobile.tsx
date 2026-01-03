import Image from 'next/image'
import clsx from 'clsx'
import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'

interface Props {
	images: string[]
	title: string
	className?: string
}

export function ProductGalleryMobile({ images, title, className }: Props) {
	const [selectedIndex, setSelectedIndex] = useState(0)

	// Оставляем только основной слайдер
	const [mainRef, mainApi] = useEmblaCarousel({ loop: true })

	const onSelect = useCallback(() => {
		if (!mainApi) return
		setSelectedIndex(mainApi.selectedScrollSnap())
	}, [mainApi])

	useEffect(() => {
		if (!mainApi) return
		mainApi.on('select', onSelect)
		mainApi.on('reInit', onSelect)
		onSelect()

		return () => {
			mainApi.off('select', onSelect)
			mainApi.off('reInit', onSelect)
		}
	}, [mainApi, onSelect])

	const scrollTo = (index: number) => {
		mainApi?.scrollTo(index)
	}

	return (
		<div className={clsx('w-full', className)}>
			{/* Main Carousel */}
			<div ref={mainRef} className='overflow-hidden'>
				<div className='flex'>
					{images.map((img, i) => (
						<div key={img + i} className='relative w-full h-[500px] shrink-0'>
							<Image
								src={img}
								alt={title}
								fill
								quality={85}
								priority={i === 0} // Первая картинка загружается быстрее
								className='object-contain rounded-[20px]'
							/>
						</div>
					))}
				</div>
			</div>

			{/* Dots Indicators */}
			<div className='mt-3 flex justify-center gap-2'>
				{images.map((_, i) => (
					<button
						key={i}
						onClick={() => scrollTo(i)}
						className={clsx(
							'h-2 w-2 rounded-full transition-all duration-300',
							selectedIndex === i ? 'bg-black w-4' : 'bg-black/30', // Сделал активную точку чуть шире для красоты
						)}
					/>
				))}
			</div>
		</div>
	)
}
