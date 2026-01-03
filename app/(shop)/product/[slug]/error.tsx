'use client'

import { NotFoundPageUI } from '@/shared/ui'
export default function ErrorPage({
	error,
}: {
	error: Error & { digest?: string }
	reset: () => void
}) {
	return <NotFoundPageUI />
}
