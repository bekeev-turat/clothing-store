import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { User, Home, Phone } from 'lucide-react'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import { IOrderAddress } from '../model/cart.types'

interface Props {
	register: UseFormRegister<IOrderAddress>
	errors: FieldErrors<IOrderAddress>
}

export const AddressFormFields = ({ register, errors }: Props) => (
	<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
		<div className='space-y-2'>
			<Label htmlFor='firstName' className='flex items-center gap-1'>
				<User className='w-3 h-3' /> Имя
			</Label>
			<Input
				id='firstName'
				{...register('firstName', { required: 'Введите имя' })}
				placeholder='Асан'
				className={
					errors.firstName
						? 'border-destructive focus-visible:ring-destructive'
						: ''
				}
			/>
			{errors.firstName && (
				<span className='text-[10px] text-destructive uppercase font-bold tracking-wider'>
					{errors.firstName.message}
				</span>
			)}
		</div>

		<div className='space-y-2'>
			<Label htmlFor='lastName'>Фамилия</Label>
			<Input
				id='lastName'
				{...register('lastName', { required: 'Введите фамилию' })}
				placeholder='Асанов'
				className={
					errors.lastName
						? 'border-destructive focus-visible:ring-destructive'
						: ''
				}
			/>
		</div>

		<div className='md:col-span-2 space-y-2'>
			<Label htmlFor='address' className='flex items-center gap-1'>
				<Home className='w-3 h-3' /> Адрес проживания
			</Label>
			<Input
				id='address'
				{...register('address', { required: 'Укажите адрес' })}
				placeholder='ул. Пушкина, д. 10, кв. 5'
				className={
					errors.address
						? 'border-destructive focus-visible:ring-destructive'
						: ''
				}
			/>
		</div>

		<div className='md:col-span-2 space-y-2'>
			<Label htmlFor='address2' className='text-muted-foreground'>
				Адрес 2 (необязательно)
			</Label>
			<Input
				id='address2'
				{...register('address2')}
				placeholder='Подъезд, код домофона и др.'
			/>
		</div>

		<div className='space-y-2'>
			<Label htmlFor='zip'>Почтовый индекс</Label>
			<Input
				id='zip'
				{...register('zip', { required: 'Укажите индекс' })}
				placeholder='123456'
				className={
					errors.zip ? 'border-destructive focus-visible:ring-destructive' : ''
				}
			/>
		</div>

		<div className='space-y-2'>
			<Label htmlFor='city'>Город</Label>
			<Input
				id='city'
				{...register('city', { required: 'Укажите город' })}
				placeholder='Москва'
				className={
					errors.city ? 'border-destructive focus-visible:ring-destructive' : ''
				}
			/>
		</div>

		<div className='md:col-span-2 space-y-2'>
			<Label htmlFor='phone' className='flex items-center gap-1'>
				<Phone className='w-3 h-3' /> Телефон
			</Label>
			<Input
				id='phone'
				type='tel'
				{...register('phone', {
					required: 'Введите номер телефона',
				})}
				placeholder='+996 (999) 00-00-00'
				className={
					errors.phone
						? 'border-destructive focus-visible:ring-destructive'
						: ''
				}
			/>
		</div>
	</div>
)
