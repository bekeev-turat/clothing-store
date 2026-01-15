import Image from 'next/image'
import { cn } from '@/shared/lib/utils'
import useEmblaCarousel from 'embla-carousel-react'
import { useCallback, useEffect, useState } from 'react'

interface Props {
	images: string[]
	title: string
	className?: string
}

export function ProductGalleryDesktop({ images, title, className }: Props) {
	const [selectedIndex, setSelectedIndex] = useState(0)

	const [mainRef, mainApi] = useEmblaCarousel({ loop: true })
	const [thumbsRef, thumbsApi] = useEmblaCarousel({
		containScroll: 'keepSnaps',
		dragFree: true,
		axis: 'y',
	})

	// Синхронизация выбранного слайдера
	const onSelect = useCallback(() => {
		if (!mainApi || !thumbsApi) return
		const index = mainApi.selectedScrollSnap()
		setSelectedIndex(index)
		thumbsApi.scrollTo(index)
	}, [mainApi, thumbsApi])

	// Инициализация main
	useEffect(() => {
		if (!mainApi || !thumbsApi) return
		mainApi.on('select', onSelect)
		mainApi.on('reInit', onSelect)

		return () => {
			mainApi.off('select', onSelect)
			mainApi.off('reInit', onSelect)
		}
	}, [mainApi, thumbsApi, onSelect])

	// Инициализация thumbs при изменении selectedIndex
	useEffect(() => {
		if (!thumbsApi) return
		thumbsApi.scrollTo(selectedIndex)
	}, [thumbsApi, selectedIndex])

	// Клик по миниатюре
	const scrollTo = (index: number) => {
		mainApi?.scrollTo(index)
		thumbsApi?.scrollTo(index)
	}
	return (
		<div className={cn('flex gap-4 h-[760px]', className)}>
			{/* Миниатюры (thumbs) */}
			<div ref={thumbsRef} className='w-36'>
				{' '}
				{/* ИСПРАВЛЕНО: было mainRef */}
				<div className='flex flex-col gap-3'>
					{images.map((img, i) => (
						<button
							key={img}
							onClick={() => scrollTo(i)}
							className={cn(
								'relative aspect-square w-30 rounded-xl overflow-hidden border border-box transition',
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

			{/* Основное фото (main) */}
			<div ref={mainRef} className='overflow-hidden rounded-2xl w-full'>
				{' '}
				{/* ИСПРАВЛЕНО: было thumbsRef */}
				<div className='flex'>
					{images.map((img, index) => (
						<div key={img} className='shrink-0 w-full h-[700px] relative'>
							<Image
								src={img}
								alt={title}
								fill
								quality={85}
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
