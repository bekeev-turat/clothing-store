import { useRouter, useSearchParams } from 'next/navigation'

export function useUpdateParams() {
	const router = useRouter()
	const searchParams = useSearchParams()

	const updateParam = (key: string, value: string) => {
		const params = new URLSearchParams(searchParams.toString())
		if (value) {
			params.set(key, value)
		} else {
			params.delete(key)
		}
		router.push(`?${params.toString()}`, { scroll: false })
	}

	return { updateParam, searchParams }
}
