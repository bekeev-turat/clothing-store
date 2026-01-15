'use client'

import { ErrorPageUI } from '@/shared/ui'

export default function ErrorPage({ reset }: { reset: () => void }) {
	return <ErrorPageUI reset={reset} />
}
