import { getProductBySlugAction } from '@/actions/product-by-slug.action'
import { VariantPage } from '@/features/product/ui/variant-page'

export default async function ProductPage({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params

	const product = await getProductBySlugAction(slug)

	return <VariantPage product={product} />
}
