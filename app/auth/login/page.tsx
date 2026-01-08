'use client'

import { useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/shared/ui/form'
import { ROUTE_MAP } from '@/shared/config/routes'
import toast from 'react-hot-toast'

export default function LoginPage() {
	const router = useRouter()
	const form = useForm({
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = async (data: { email: string; password: string }) => {
		const res = await signIn('credentials', {
			email: data.email,
			password: data.password,
			redirect: false,
		})

		if (res?.error) {
			toast.error('Неверный email или пароль')
			return
		}

		router.push(ROUTE_MAP.home)
	}

	return (
		<div className='w-full max-w-md mx-auto space-y-6'>
			<div className='space-y-2 text-center'>
				<h2 className='text-3xl font-bold tracking-tight'>С возвращением</h2>
				<p className='text-muted-foreground text-sm'>
					Войдите в систему, чтобы продолжить
				</p>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
					<FormField
						control={form.control}
						name='email'
						rules={{ required: 'Введите email' }}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input placeholder='name@company.com' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='password'
						rules={{ required: 'Введите пароль' }}
						render={({ field }) => (
							<FormItem>
								<div className='flex items-center justify-between'>
									<FormLabel>Пароль</FormLabel>
									<Link
										href={ROUTE_MAP.auth.resetPassword}
										className='text-xs text-primary hover:underline font-medium'
									>
										Забыли пароль?
									</Link>
								</div>
								<FormControl>
									<Input type='password' placeholder='••••••••' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						type='submit'
						className='w-full'
						disabled={form.formState.isSubmitting}
					>
						{form.formState.isSubmitting ? 'Вход...' : 'Войти'}
					</Button>
				</form>
			</Form>

			<p className='text-center text-sm text-muted-foreground'>
				Нет аккаунта?{' '}
				<Link
					href={ROUTE_MAP.auth.register}
					className='text-primary hover:underline font-medium'
				>
					Зарегистрироваться
				</Link>
			</p>
		</div>
	)
}
