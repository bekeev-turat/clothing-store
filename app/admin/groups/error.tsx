'use client'

import { ErrorPageUI } from '@/shared/ui'

export default function Error({ reset }: { reset: () => void }) {
	return <ErrorPageUI reset={reset} />
}
