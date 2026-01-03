'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ProductGalleryDesktop } from './product-gallery-desktop'
import { ProductGalleryMobile } from './product-gallery-mobile'

interface Props {
	images: string[]
	title: string
}

export function ProductGallery({ images, title }: Props) {
	const [selectedIndex, setSelectedIndex] = useState(0)

	const [mainRef, mainApi] = useEmblaCarousel({ loop: true })
	const [thumbsRef, thumbsApi] = useEmblaCarousel({
		containScroll: 'keepSnaps',
		dragFree: true,
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
		onSelect() // синхронизируем при монтировании

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
		<>
			<ProductGalleryDesktop
				images={images}
				title={title}
				mainRef={mainRef}
				thumbsRef={thumbsRef}
				selectedIndex={selectedIndex}
				onThumbClick={scrollTo}
				className='hidden md:flex'
			/>

			<ProductGalleryMobile
				images={images}
				title={title}
				mainRef={mainRef}
				selectedIndex={selectedIndex}
				onDotClick={scrollTo}
				className='md:hidden'
			/>
		</>
	)
}
