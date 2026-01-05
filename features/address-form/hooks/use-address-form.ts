'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks'
import { saveAddress } from '@/features/cart/store/cart.slice'
import { IOrderAddress } from '@/features/cart/model/cart.types'

export const useAddressForm = () => {
	const dispatch = useAppDispatch()
	const router = useRouter()
	const savedAddress = useAppSelector((state) => state.cart.address)

	const form = useForm<IOrderAddress>({
		defaultValues: savedAddress || {},
	})

	const onSubmit = (data: IOrderAddress) => {
		dispatch(saveAddress(data))
		router.push('/checkout')
	}

	return {
		form,
		onSubmit: form.handleSubmit(onSubmit),
		errors: form.formState.errors,
	}
}
