'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'

export function useUpdateParams() {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const updateParam = (key: string, value: string | null) => {
		const params = new URLSearchParams(searchParams.toString())
		if (value) {
			params.set(key, value)
		} else {
			params.delete(key)
		}
		router.push(`${pathname}?${params.toString()}`, { scroll: false })
	}

	const toggleArrayParam = (key: string, value: string) => {
		const current = searchParams.get(key)?.split(',').filter(Boolean) || []
		const updated = current.includes(value)
			? current.filter((v) => v !== value)
			: [...current, value]

		updateParam(key, updated.length > 0 ? updated.join(',') : null)
	}

	return { updateParam, toggleArrayParam, searchParams, pathname }
}
