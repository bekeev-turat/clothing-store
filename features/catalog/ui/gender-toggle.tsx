import Link from 'next/link'
import { GENDER_OPTIONS } from '@/shared/const/gender'
import { ROUTE_MAP } from '@/shared/config/routes'
import { ItemGender } from '@/prisma/generated/enums'
import { cn } from '@/shared/lib'

export function GenderToggle({ currentGender }: { currentGender?: string }) {
	return (
		<div className='flex justify-between gap-10 mb-10'>
			{GENDER_OPTIONS.map((gender) => (
				<Link
					key={gender.value}
					href={ROUTE_MAP.catalog[gender.value as ItemGender]}
					className={cn(
						'antialiased text-4xl font-semibold my-7 text-secondary transition-colors',
						gender.value === currentGender && 'text-primary',
					)}
				>
					{gender.label}
				</Link>
			))}
		</div>
	)
}
