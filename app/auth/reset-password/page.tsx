// src/app/(auth)/forgot-password/page.tsx
'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { ArrowLeft, MailCheck } from 'lucide-react'
import { AuthInput } from '@/shared/ui/auth-input'
import { ROUTE_MAP } from '@/shared/config/routes'

export default function ResetPasswordPage() {
	const [isSent, setIsSent] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: {
			email: '',
		},
	})

	const onSubmit = async (data: { email: string }) => {
		console.log('Reset link requested for:', data.email)
		// Имитация запроса к API
		await new Promise((resolve) => setTimeout(resolve, 1500))
		setIsSent(true)
	}

	// Состояние после успешной отправки письма
	if (isSent) {
		return (
			<div className='text-center'>
				<div className='mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6'>
					<MailCheck className='h-8 w-8 text-green-600' />
				</div>
				<h2 className='text-2xl font-bold text-gray-800'>Проверьте почту</h2>
				<p className='text-gray-500 text-sm mt-3 mb-8'>
					Мы отправили инструкцию по восстановлению пароля на ваш электронный
					адрес.
				</p>
				<Link
					href={ROUTE_MAP.home}
					className='inline-flex items-center text-indigo-600 hover:text-indigo-500 font-medium transition-colors'
				>
					<ArrowLeft className='mr-2 h-4 w-4' />
					Вернуться к входу
				</Link>
			</div>
		)
	}

	return (
		<>
			<div className='mb-6'>
				<h2 className='text-2xl font-bold text-gray-800'>Забыли пароль?</h2>
				<p className='text-gray-500 text-sm'>
					Введите ваш email, и мы отправим вам ссылку для восстановления
					доступа.
				</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
				<AuthInput
					label='Email адрес'
					type='email'
					placeholder='name@company.com'
					registration={register('email', {
						required: 'Введите email',
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: 'Некорректный формат почты',
						},
					})}
					error={errors.email?.message}
				/>

				<button
					type='submit'
					disabled={isSubmitting}
					className='w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-2.5 rounded-lg transition-all active:scale-[0.98]'
				>
					{isSubmitting ? 'Отправка...' : 'Сбросить пароль'}
				</button>

				<div className='text-center mt-4'>
					<Link
						href='/login'
						className='inline-flex items-center text-sm text-gray-500 hover:text-indigo-600 transition-colors'
					>
						<ArrowLeft className='mr-2 h-4 w-4' />Я вспомнил пароль
					</Link>
				</div>
			</form>
		</>
	)
}
