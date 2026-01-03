export function buildPagination(pageIndex = 1, pageSize = 12) {
	const page = Number.isInteger(pageIndex) && pageIndex > 0 ? pageIndex : 1
	const limit = Number.isInteger(pageSize) && pageSize > 0 ? pageSize : 12

	return {
		page,
		limit,
		offset: (page - 1) * limit,
	}
}
