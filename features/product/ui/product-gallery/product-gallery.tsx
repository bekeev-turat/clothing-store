'use client'

import { ProductGalleryDesktop } from './product-gallery-desktop'
import { ProductGalleryMobile } from './product-gallery-mobile'

interface Props {
	images: string[]
	title: string
}

export function ProductGallery({ images, title }: Props) {
	return (
		<>
			<ProductGalleryDesktop
				images={images}
				title={title}
				className='hidden md:flex'
			/>

			<ProductGalleryMobile
				images={images}
				title={title}
				className='md:hidden'
			/>
		</>
	)
}
