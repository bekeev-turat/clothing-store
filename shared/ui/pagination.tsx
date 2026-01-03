'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { IoChevronBack, IoChevronForward } from 'react-icons/io5'
import clsx from 'clsx'
import { useCallback, useMemo } from 'react'
import { buildPaginationLib } from '@/shared/lib'

interface PaginationProps {
	currentPage: number
	totalPages: number
	// Добавляем класс для кастомизации отступов
	className?: string
}

// Выносим логику формирования ссылки в хук, чтобы не дублировать
function usePaginationUrl() {
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const createPageUrl = useCallback(
		(pageNumber: number | string) => {
			const params = new URLSearchParams(searchParams.toString())
			if (Number(pageNumber) <= 1) {
				params.delete('pageIndex')
			} else {
				params.set('pageIndex', pageNumber.toString())
			}
			return `${pathname}?${params.toString()}`
		},
		[pathname, searchParams],
	)

	return { createPageUrl }
}

export const Pagination = ({
	currentPage,
	totalPages,
	className,
}: PaginationProps) => {
	const { createPageUrl } = usePaginationUrl()

	// Мемоизируем массив страниц, чтобы не пересчитывать при каждом рендере
	const pages = useMemo(
		() => buildPaginationLib(currentPage, totalPages),
		[currentPage, totalPages],
	)

	if (totalPages <= 1) return null

	return (
		<nav
			role='navigation'
			aria-label='Pagination Navigation'
			className={clsx('flex justify-center mt-12', className)}
		>
			<div className='flex items-center gap-1'>
				{/* Кнопка Назад */}
				<PaginationArrow
					direction='left'
					href={createPageUrl(currentPage - 1)}
					isDisabled={currentPage <= 1}
				/>

				{/* Список страниц */}
				{pages.map((page, idx) => {
					if (page === 'dots') {
						return (
							<span
								key={`dots-${idx}`}
								className='px-3 text-gray-400 select-none'
							>
								…
							</span>
						)
					}

					return (
						<PaginationNumber
							key={page}
							href={createPageUrl(page)}
							page={page}
							isActive={currentPage === page}
						/>
					)
				})}

				{/* Кнопка Вперед */}
				<PaginationArrow
					direction='right'
					href={createPageUrl(currentPage + 1)}
					isDisabled={currentPage >= totalPages}
				/>
			</div>
		</nav>
	)
}

// Вспомогательные компоненты для чистоты кода
function PaginationNumber({
	href,
	page,
	isActive,
}: {
	href: string
	page: number
	isActive: boolean
}) {
	return (
		<Link
			href={href}
			aria-current={isActive ? 'page' : undefined}
			className={clsx(
				'px-3 py-1.5 rounded-md border text-sm transition focus-visible:ring-2 focus-visible:ring-black outline-none',
				isActive
					? 'bg-black text-white border-black'
					: 'hover:bg-gray-100 border-gray-200 text-gray-700',
			)}
		>
			{page}
		</Link>
	)
}

function PaginationArrow({
	href,
	direction,
	isDisabled,
}: {
	href: string
	direction: 'left' | 'right'
	isDisabled: boolean
}) {
	const Icon = direction === 'left' ? IoChevronBack : IoChevronForward

	if (isDisabled) {
		return (
			<div className='p-2 rounded-md border border-gray-100 text-gray-300 cursor-not-allowed opacity-50'>
				<Icon size={18} />
			</div>
		)
	}

	return (
		<Link
			href={href}
			className='p-2 rounded-md border border-gray-200 hover:bg-gray-100 transition focus-visible:ring-2 focus-visible:ring-black outline-none'
			aria-label={direction === 'left' ? 'Previous page' : 'Next page'}
		>
			<Icon size={18} />
		</Link>
	)
}
