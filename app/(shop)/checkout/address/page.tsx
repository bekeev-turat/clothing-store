'use client'

import Link from 'next/link'
import { MapPin, ChevronLeft } from 'lucide-react'

import { Button } from '@/shared/ui/button'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/shared/ui/card'
import { ROUTE_MAP } from '@/shared/config/routes'
import { AddressFormFields } from '@/features/cart/ui/address-form-fields'
import { useAddressForm } from '@/shared/hooks'

export default function AddressPage() {
	const { form, onSubmit, errors } = useAddressForm()

	return (
		<div className='bg-background min-h-screen pb-20'>
			<div className='max-w-4xl mx-auto px-4 pt-8'>
				<BackButton href={ROUTE_MAP.cart.root} />

				<div className='space-y-6'>
					<Header
						title='Адрес доставки'
						description='Пожалуйста, введите данные...'
					/>

					<form onSubmit={onSubmit}>
						<Card className='border-border shadow-sm'>
							<CardHeader>
								<CardTitle className='text-xl flex items-center gap-2'>
									<MapPin className='w-5 h-5 text-primary' />
									Контактные данные
								</CardTitle>
								<CardDescription>Заполните форму ниже</CardDescription>
							</CardHeader>
							<CardContent className='space-y-6'>
								<AddressFormFields register={form.register} errors={errors} />

								<FormActions />
							</CardContent>
						</Card>
					</form>
				</div>
			</div>
		</div>
	)
}

// Вспомогательные под-компоненты (можно вынести в отдельные файлы)
const BackButton = ({ href }: { href: string }) => (
	<Button
		variant='ghost'
		size='sm'
		asChild
		className='mb-6 -ml-2 text-muted-foreground'
	>
		<Link href={href}>
			<ChevronLeft className='w-4 h-4 mr-1' />
			Назад в корзину
		</Link>
	</Button>
)

const Header = ({
	title,
	description,
}: {
	title: string
	description: string
}) => (
	<div>
		<h1 className='text-3xl font-extrabold tracking-tight'>{title}</h1>
		<p className='text-muted-foreground mt-2'>{description}</p>
	</div>
)

const FormActions = () => (
	<div className='pt-6 flex flex-col sm:flex-row gap-4'>
		<Button type='submit' className='w-full sm:w-1/2 h-12 text-lg font-bold'>
			Подтвердить и продолжить
		</Button>
		<Button variant='ghost' asChild className='w-full sm:w-1/2 h-12'>
			<Link href={ROUTE_MAP.cart.checkout}>Отмена</Link>
		</Button>
	</div>
)
