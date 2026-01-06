'use client'

import { useEffect } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import toast from 'react-hot-toast'
import { updateOrderStatusAction } from '@/actions/order.actions'
import { OrderStatus } from '@/prisma/generated/enums'

export function StripeToastHandler() {
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const { replace } = useRouter()

	useEffect(() => {
		const sessionId = searchParams.get('session_id')
		const cancel = searchParams.get('cancel')

		// ✅ Успешная оплата
		if (sessionId) {
			;(async () => {
				try {
					const res = await fetch(`/api/stripe-session/${sessionId}`)
					const data = await res.json()

					if (data.orderId) {
						await updateOrderStatusAction(data.orderId, OrderStatus.PAID)
						toast.success('Оплата прошла успешно 🎉', { id: 'stripe-success' })
					}
				} catch (e) {
					console.error(e)
					toast.error('Ошибка при подтверждении оплаты', { id: 'stripe-error' })
				} finally {
					replace(pathname)
				}
			})()
		}

		// ❌ Отмена оплаты
		if (cancel) {
			toast.error('Оплата отменена', { id: 'stripe-cancel' })
			replace(pathname)
		}
	}, [searchParams, pathname, replace])

	return null
}
