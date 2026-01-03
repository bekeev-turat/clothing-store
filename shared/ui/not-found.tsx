'use client'

import Image from 'next/image'
import Link from 'next/link'
import Lottie from 'lottie-react'
import animationData from '@/public/animations/404-error-page-with-cat.json'

export const NotFoundPageUI = () => {
	return (
		<section className='min-h-screen w-full flex items-center justify-center px-6'>
			<div className='grid max-w-5xl grid-cols-1 md:grid-cols-2 gap-10 items-center'>
				<div className='space-y-6 text-center md:text-left'>
					<span className='inline-block rounded-full bg-gray-100 px-4 py-1 text-sm font-medium text-gray-600'>
						Error 404
					</span>

					<h1 className='text-4xl md:text-5xl font-bold tracking-tight'>
						Страница не найдена
					</h1>

					<p className='text-gray-500 leading-relaxed'>
						Страница, которую вы ищете, не существует или была перемещена.
						Пожалуйста, проверьте адрес или вернитесь на главную страницу.
					</p>

					<Link
						href='/'
						className='rounded-lg bg-black px-6 py-3 text-white text-sm font-medium hover:bg-gray-800 transition'
					>
						Перейти на главную
					</Link>
				</div>

				{/* Image block */}
				<div className='flex justify-center'>
					{/* <Image
						src='/imgs/404-illustration.svg'
						alt='Page not found illustration'
						width={420}
						height={420}
						priority
					/> */}
					<Lottie animationData={animationData} loop={true} />
				</div>
			</div>
		</section>
	)
}
