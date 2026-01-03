'use client'

import { ErrorPageUI } from '@/shared/ui'

export default function ErrorPage({
	reset,
	error,
}: {
	reset: () => void
	error: Error & { digest?: string }
}) {
	return <ErrorPageUI reset={reset} />
}
