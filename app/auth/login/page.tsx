'use client'

import { loginAction } from '@/actions/auth.actions'
import { ROUTE_MAP } from '@/shared/config/routes'
import { AuthInput } from '@/shared/ui/auth-input'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
// import { signIn } from 'next-auth/react'

type LoginFormValues = {
	email: string
	password: string
}
export default function LoginPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
	})
	const router = useRouter()

	const onSubmit = async (data: LoginFormValues) => {
		// No event.preventDefault() needed; handleSubmit handles it
		// No new FormData() needed; data is already a plain object

		const res = await signIn('credentials', {
			email: data.email, // Access properties directly
			password: data.password,
			redirect: false,
		})

		if (res?.error) {
			alert('Неверный email или пароль')
			return
		}

		router.push(ROUTE_MAP.home)
	}

	return (
		<>
			<div className='mb-6'>
				<h2 className='text-2xl font-bold text-gray-800'>С возвращением!</h2>
				<p className='text-gray-500 text-sm'>
					Войдите в систему, чтобы продолжить
				</p>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
				<AuthInput
					label='Email'
					type='email'
					placeholder='name@company.com'
					registration={register('email', { required: 'Введите email' })}
					error={errors.email?.message}
				/>

				<div className='space-y-1'>
					<div className='flex items-center justify-between'>
						<label className='block text-sm font-medium text-gray-700'>
							Пароль
						</label>
						<Link
							href={ROUTE_MAP.auth.resetPassword}
							className='text-xs text-indigo-600 hover:text-indigo-500 font-medium'
						>
							Забыли пароль?
						</Link>
					</div>
					<AuthInput
						type='password'
						placeholder='••••••••'
						registration={register('password', {
							required: 'Введите пароль',
							minLength: { value: 6, message: 'Минимум 6 символов' },
						})}
						error={errors.password?.message}
					/>
				</div>

				<button
					type='submit'
					className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition-all active:scale-[0.98]'
				>
					Войти
				</button>
			</form>

			<p className='mt-6 text-center text-sm text-gray-600'>
				Нет аккаунта?{' '}
				<Link
					href={ROUTE_MAP.auth.register}
					className='text-indigo-600 hover:underline font-medium'
				>
					Зарегистрироваться
				</Link>
			</p>
		</>
	)
}
