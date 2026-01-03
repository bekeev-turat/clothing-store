import { getProductBySlugAction } from '@/actions/product-by-slug.action'
import { VariantPage } from './components/variant-page'
import { notFound } from 'next/navigation'

export default async function ProductPage({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params

	const product = await getProductBySlugAction(slug)

	if (!product) {
		notFound() // Это прервет выполнение и покажет страницу 404
	}

	return <VariantPage product={product} />
}
