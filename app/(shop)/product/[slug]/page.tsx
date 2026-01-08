import { getProductBySlugAction } from '@/actions/product-by-slug.action'
import { VariantPage } from '@/features/product/ui/variant-page'
import { Metadata } from 'next'

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>
}): Promise<Metadata> {
	const { slug } = await params
	const product = await getProductBySlugAction(slug)

	return {
		title: `Купить ${slug} | Магазин BeUp`,
		description: product.description,
	}
}

export default async function ProductPage({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params

	const product = await getProductBySlugAction(slug)

	return <VariantPage product={product} />
}
