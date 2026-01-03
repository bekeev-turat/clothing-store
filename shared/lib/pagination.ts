export function parsePage(param?: string, defaultValue = 1) {
	const page = Number(param)
	return Number.isInteger(page) && page > 0 ? page : defaultValue
}
