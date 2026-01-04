'use client'

import { ROUTE_MAP } from '@/shared/config/routes'
import { useUpdateParams } from '@/shared/hooks'
import { GroupWithCountDTO } from '@/shared/lib/zod/groups.schema'
import {
	Label,
	Button,
	Input,
	Checkbox,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/shared/ui'
import { X } from 'lucide-react'

export function FiltersSidebar({ groups }: { groups: GroupWithCountDTO[] }) {
	const { updateParam, searchParams } = useUpdateParams()

	const handleReset = () => {
		window.location.href = ROUTE_MAP.home
	}

	return (
		<div className='space-y-8 sticky top-4 p-1'>
			<div className='space-y-3'>
				<Label className='text-base font-bold'>Категория</Label>
				<Select
					value={searchParams.get('groupSlug') || 'all'}
					onValueChange={(val) =>
						updateParam('groupSlug', val === 'all' ? '' : val)
					}
				>
					<SelectTrigger className='w-full'>
						<SelectValue placeholder='Вид одежды' />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value='all'>Все</SelectItem>
						{groups.map((g) => {
							if (g._count.items) {
								return (
									<SelectItem key={g.id} value={g.slug}>
										{g.title}
									</SelectItem>
								)
							}
						})}
					</SelectContent>
				</Select>
			</div>

			{/* Фильтр по цене */}
			<div className='space-y-3'>
				<Label className='text-base font-bold'>Цена</Label>
				<div className='flex items-center gap-2'>
					<Input
						type='number'
						placeholder='От'
						className='h-9'
						defaultValue={searchParams.get('minPrice') || ''}
						onBlur={(e) => updateParam('minPrice', e.target.value)}
					/>
					<span className='text-muted-foreground'>—</span>
					<Input
						type='number'
						placeholder='До'
						className='h-9'
						defaultValue={searchParams.get('maxPrice') || ''}
						onBlur={(e) => updateParam('maxPrice', e.target.value)}
					/>
				</div>
			</div>

			{/* Чекбокс: Молния */}
			<div className='flex items-center space-x-2 pt-2'>
				<Checkbox
					id='zipper'
					checked={searchParams.get('hasZipper') === 'true'}
					onCheckedChange={(checked) =>
						updateParam('hasZipper', checked ? 'true' : '')
					}
				/>
				<Label
					htmlFor='zipper'
					className='text-sm font-medium leading-none cursor-pointer peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
				>
					На молнии
				</Label>
			</div>

			{/* Кнопка сброса */}
			<Button variant='outline' className='w-full' onClick={handleReset}>
				<X className='mr-2 h-4 w-4' />
				Сбросить фильтры
			</Button>
		</div>
	)
}
