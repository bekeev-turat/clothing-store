'use client'

import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { AuthInput } from '@/shared/ui/auth-input'
import { ROUTE_MAP } from '@/shared/config/routes'
import { useRouter } from 'next/navigation'
import { registerAction } from '@/actions/auth.actions'
import { signIn } from 'next-auth/react'

export default function RegisterPage() {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors, isSubmitting },
	} = useForm({
		defaultValues: {
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	})

	// Следим за значением пароля для валидации подтверждения
	const passwordValue = watch('password')
	const router = useRouter()

	const onSubmit = async (data: { email: string; password: string }) => {
		const res = await registerAction(data)

		if (res?.error) {
			alert(res.error)
			return
		}

		const signInResult = await signIn('credentials', {
			email: data.email.toLowerCase(),
			password: data.password,
			redirect: false,
		})

		router.push(ROUTE_MAP.home)
	}
	return (
		<>
			<div className='mb-6'>
				<h2 className='text-2xl font-bold text-gray-800'>Создать аккаунт</h2>
				<p className='text-gray-500 text-sm'>
					Присоединяйтесь к нашей платформе
				</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
				{/* Имя пользователя */}
				<AuthInput
					label='Имя пользователя'
					type='text'
					placeholder='ivan_ivanov'
					registration={register('username', {
						required: 'Введите имя пользователя',
						minLength: { value: 3, message: 'Минимум 3 символа' },
					})}
					error={errors.username?.message}
				/>

				{/* Email */}
				<AuthInput
					label='Email'
					type='email'
					placeholder='name@company.com'
					registration={register('email', {
						required: 'Введите email',
						pattern: {
							value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
							message: 'Некорректный email',
						},
					})}
					error={errors.email?.message}
				/>

				{/* Пароль */}
				<AuthInput
					label='Пароль'
					type='password'
					placeholder='••••••••'
					registration={register('password', {
						required: 'Придумайте пароль',
						minLength: {
							value: 8,
							message: 'Пароль должен быть не менее 8 символов',
						},
					})}
					error={errors.password?.message}
				/>

				{/* Подтверждение пароля */}
				<AuthInput
					label='Подтвердите пароль'
					type='password'
					placeholder='••••••••'
					registration={register('confirmPassword', {
						required: 'Повторите пароль',
						validate: (value) =>
							value === passwordValue || 'Пароли не совпадают',
					})}
					error={errors.confirmPassword?.message}
				/>

				<button
					type='submit'
					disabled={isSubmitting}
					className='w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-2.5 rounded-lg transition-all active:scale-[0.98] mt-2'
				>
					{isSubmitting ? 'Создание...' : 'Зарегистрироваться'}
				</button>
			</form>

			<p className='mt-6 text-center text-sm text-gray-600'>
				Уже есть аккаунт?{' '}
				<Link
					href={ROUTE_MAP.auth.login}
					className='text-indigo-600 hover:underline font-medium'
				>
					Войти
				</Link>
			</p>
		</>
	)
}
