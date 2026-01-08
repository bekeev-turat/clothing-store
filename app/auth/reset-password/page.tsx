'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { ArrowLeft, MailCheck } from 'lucide-react'

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

export default function ForgotPasswordPage() {
	const [isSent, setIsSent] = useState(false)

	const form = useForm({
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
			<div className='text-center space-y-6'>
				<div className='mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100'>
					<MailCheck className='h-8 w-8 text-green-600' />
				</div>
				<div className='space-y-2'>
					<h2 className='text-2xl font-bold tracking-tight'>Проверьте почту</h2>
					<p className='text-muted-foreground text-sm'>
						Мы отправили инструкцию по восстановлению пароля на ваш электронный
						адрес.
					</p>
				</div>
				<div className='pt-4'>
					<Link
						href={ROUTE_MAP.auth.login || '/login'}
						className='inline-flex items-center text-sm font-medium text-primary hover:underline'
					>
						<ArrowLeft className='mr-2 h-4 w-4' />
						Вернуться к входу
					</Link>
				</div>
			</div>
		)
	}

	return (
		<div className='w-full max-w-md mx-auto space-y-6'>
			<div className='space-y-2 text-center'>
				<h2 className='text-3xl font-bold tracking-tight'>Забыли пароль?</h2>
				<p className='text-muted-foreground text-sm'>
					Введите ваш email, и мы отправим вам ссылку для восстановления
					доступа.
				</p>
			</div>

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
					<FormField
						control={form.control}
						name='email'
						rules={{
							required: 'Введите email',
							pattern: {
								value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
								message: 'Некорректный формат почты',
							},
						}}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email адрес</FormLabel>
								<FormControl>
									<Input placeholder='name@company.com' {...field} />
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
						{form.formState.isSubmitting ? 'Отправка...' : 'Сбросить пароль'}
					</Button>
				</form>
			</Form>

			<div className='text-center'>
				<Link
					href={ROUTE_MAP.auth.login || '/login'}
					className='inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors'
				>
					<ArrowLeft className='mr-2 h-4 w-4' />Я вспомнил пароль
				</Link>
			</div>
		</div>
	)
}
