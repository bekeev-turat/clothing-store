type CatalogParams = {
	gender: 'male' | 'female'
	slug?: string
}

export function parseCategory(category: string): CatalogParams {
	const parts = category.split('-')

	const gender = parts[0] as CatalogParams['gender']
	const slug = parts.length > 1 ? parts.slice(1).join('-') : undefined

	return { gender, slug }
}
