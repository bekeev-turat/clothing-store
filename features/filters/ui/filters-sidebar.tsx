'use client'

import React from 'react'
import { X } from 'lucide-react'
import { ItemSize } from '@/prisma/generated/enums'
import { useUpdateParams } from '@/shared/hooks'
import { GroupWithCountDTO } from '@/shared/lib/zod/groups.schema'
import {
	Button,
	Input,
	Checkbox,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/shared/ui'

interface Props {
	groups: GroupWithCountDTO[]
	availableBrands: string[] | null | undefined
}

export function FiltersToolbar({ groups, availableBrands = [] }: Props) {
	const { updateParam, toggleArrayParam, searchParams, pathname } =
		useUpdateParams()

	// Извлекаем значения из URL
	const activeBrands =
		searchParams.get('brands')?.split(',').filter(Boolean) || []
	const activeSizes =
		searchParams.get('sizes')?.split(',').filter(Boolean) || []
	const minPrice = searchParams.get('minPrice') || ''
	const maxPrice = searchParams.get('maxPrice') || ''
	const currentGroup = searchParams.get('groupSlug') || 'all'

	const handleReset = () => {
		// Вместо полной перезагрузки страницы, просто переходим на чистый путь
		window.location.href = pathname
	}

	return (
		<div className='sticky top-0 z-20 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
			<div className='flex flex-wrap items-end gap-4 py-4'>
				{/* Фильтр: Бренды */}
				<FilterWrapper label='Бренд'>
					<Popover>
						<PopoverTrigger asChild>
							<Button variant='outline' size='sm' className='h-9'>
								{activeBrands.length > 0
									? `Бренды: ${activeBrands.length}`
									: 'Все бренды'}
							</Button>
						</PopoverTrigger>
						<PopoverContent className='w-[200px] p-2' align='start'>
							<div className='max-h-[300px] overflow-y-auto space-y-1'>
								{availableBrands?.map((brand) => (
									<label
										key={brand}
										className='flex items-center space-x-2 p-2 hover:bg-accent rounded-sm cursor-pointer'
									>
										<Checkbox
											checked={activeBrands.includes(brand)}
											onCheckedChange={() => toggleArrayParam('brands', brand)}
										/>
										<span className='text-sm'>{brand}</span>
									</label>
								))}
							</div>
						</PopoverContent>
					</Popover>
				</FilterWrapper>

				{/* Фильтр: Категория */}
				<FilterWrapper label='Категория'>
					<Select
						value={currentGroup}
						onValueChange={(val) =>
							updateParam('groupSlug', val === 'all' ? null : val)
						}
					>
						<SelectTrigger className='w-[160px] h-9'>
							<SelectValue placeholder='Все товары' />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value='all'>Все категории</SelectItem>
							{groups
								.filter((g) => g._count.items > 0)
								.map((g) => (
									<SelectItem key={g.id} value={g.slug}>
										{g.title}
									</SelectItem>
								))}
						</SelectContent>
					</Select>
				</FilterWrapper>

				{/* Фильтр: Цена */}
				<FilterWrapper label='Цена'>
					<Popover>
						<PopoverTrigger asChild>
							<Button variant='outline' size='sm' className='h-9'>
								{minPrice || maxPrice
									? `${minPrice || 0} — ${maxPrice || '∞'} сом`
									: 'Диапазон'}
							</Button>
						</PopoverTrigger>
						<PopoverContent className='w-64 p-4' align='start'>
							<div className='space-y-4'>
								<p className='text-sm font-medium'>Диапазон цены</p>
								<div className='flex items-center gap-2'>
									<Input
										type='number'
										placeholder='От'
										defaultValue={minPrice}
										onBlur={(e) => updateParam('minPrice', e.target.value)}
									/>
									<Input
										type='number'
										placeholder='До'
										defaultValue={maxPrice}
										onBlur={(e) => updateParam('maxPrice', e.target.value)}
									/>
								</div>
							</div>
						</PopoverContent>
					</Popover>
				</FilterWrapper>

				{/* Фильтр: Размеры */}
				<FilterWrapper label='Размер'>
					<Popover>
						<PopoverTrigger asChild>
							<Button variant='outline' size='sm' className='h-9'>
								{activeSizes.length > 0
									? `Размеры: ${activeSizes.length}`
									: 'Выбрать'}
							</Button>
						</PopoverTrigger>
						<PopoverContent className='w-[200px] p-2' align='start'>
							<div className='grid grid-cols-2 gap-1'>
								{Object.values(ItemSize).map((size) => (
									<label
										key={size}
										className='flex items-center space-x-2 p-2 hover:bg-accent rounded-sm cursor-pointer'
									>
										<Checkbox
											checked={activeSizes.includes(size)}
											onCheckedChange={() => toggleArrayParam('sizes', size)}
										/>
										<span className='text-sm'>{size}</span>
									</label>
								))}
							</div>
						</PopoverContent>
					</Popover>
				</FilterWrapper>

				{/* Кнопка сброса */}
				<div className='ml-auto'>
					<Button
						variant='ghost'
						size='sm'
						className='h-9 text-muted-foreground'
						onClick={handleReset}
					>
						<X className='mr-2 h-4 w-4' />
						Сбросить
					</Button>
				</div>
			</div>
		</div>
	)
}

/** Вспомогательный компонент для обертки лейбла */
function FilterWrapper({
	label,
	children,
}: {
	label: string
	children: React.ReactNode
}) {
	return (
		<div className='flex flex-col gap-1.5'>
			<span className='text-[10px] uppercase font-bold text-muted-foreground ml-1'>
				{label}
			</span>
			{children}
		</div>
	)
}
