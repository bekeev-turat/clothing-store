'use client'

import { MapPin } from 'lucide-react'

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/shared/ui/card'
import {
	AddressBackButton,
	AddressFormActions,
	AddressHeader,
	AddressFormFields,
} from '@/features/address-form/ui'

import { useAddressForm } from '@/features/address-form/hooks/use-address-form'

import { ROUTE_MAP } from '@/shared/config/routes'

export default function AddressPage() {
	const { form, onSubmit, errors } = useAddressForm()

	return (
		<div className='bg-background min-h-screen pb-20'>
			<div className='max-w-4xl mx-auto px-4 pt-8'>
				<AddressBackButton href={ROUTE_MAP.cart.root} />

				<div className='space-y-6'>
					<AddressHeader
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

								<AddressFormActions />
							</CardContent>
						</Card>
					</form>
				</div>
			</div>
		</div>
	)
}
