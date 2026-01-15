'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signIn } from 'next-auth/react'

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
import { registerAction } from '@/actions/auth.actions'
import { ROUTE_MAP } from '@/shared/config/routes'
import toast from 'react-hot-toast'
import { TRegisterSchema } from '@/shared/lib/zod/account.schema'

export default function RegisterPage() {
	const router = useRouter()
	const form = useForm({
		defaultValues: {
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
	})

	const onSubmit = async (data: TRegisterSchema) => {
		const res = await registerAction(data)

		if (res?.error) {
			toast.error(res.error)
			return
		}

		await signIn('credentials', {
			email: data.email.toLowerCase(),
			password: data.password,
			redirect: false,
		})

		router.push(ROUTE_MAP.home)
	}

	return (
		<div className='w-full max-w-md mx-auto space-y-6'>
			<div className='space-y-2 text-center'>
				<h2 className='text-3xl font-bold tracking-tight'>Создать аккаунт</h2>
				<p className='text-muted-foreground text-sm'>Присоединяйтесь к нам</p>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
					<FormField
						control={form.control}
						name='username'
						rules={{
							required: 'Введите имя',
							minLength: { value: 3, message: 'Минимум 3 символа' },
						}}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Имя пользователя</FormLabel>
								<FormControl>
									<Input placeholder='asan_asanov' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='email'
						rules={{
							required: 'Введите email',
							pattern: { value: /\S+@\S+\.\S+/, message: 'Некорректный email' },
						}}
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
						rules={{
							required: 'Придумайте пароль',
							minLength: { value: 8, message: 'Минимум 8 символов' },
						}}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Пароль</FormLabel>
								<FormControl>
									<Input type='password' placeholder='••••••••' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name='confirmPassword'
						rules={{
							required: 'Повторите пароль',
							validate: (val) =>
								val === form.getValues('password') || 'Пароли не совпадают',
						}}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Подтвердите пароль</FormLabel>
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
						{form.formState.isSubmitting ? 'Создание...' : 'Зарегистрироваться'}
					</Button>
				</form>
			</Form>

			<p className='text-center text-sm text-muted-foreground'>
				Уже есть аккаунт?{' '}
				<Link
					href={ROUTE_MAP.auth.login}
					className='text-primary hover:underline font-medium'
				>
					Войти
				</Link>
			</p>
		</div>
	)
}
