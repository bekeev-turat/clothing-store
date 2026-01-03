export type PageItem = number | 'dots'

export const buildPaginationLib = (
	current: number,
	total: number,
	windowSize = 1,
): PageItem[] => {
	const pages: PageItem[] = []

	const start = Math.max(2, current - windowSize)
	const end = Math.min(total - 1, current + windowSize)

	pages.push(1)

	if (start > 2) pages.push('dots')

	for (let i = start; i <= end; i++) {
		pages.push(i)
	}

	if (end < total - 1) pages.push('dots')

	if (total > 1) pages.push(total)

	return pages
}
