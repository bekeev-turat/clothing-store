import { getProductBySlugAction } from '@/actions/product-by-slug.action'
import { VariantPage } from '@/features/product/ui/variant-page'
import { LoadingPage } from '@/shared/ui/loading'
import { Metadata } from 'next'

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>
}): Promise<Metadata> {
	const { slug } = await params
	const { data } = await getProductBySlugAction(slug)

	return {
		title: `Купить ${slug} | Магазин BeUp`,
		description: data?.description,
	}
}

export default async function ProductPage({
	params,
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	const { data } = await getProductBySlugAction(slug)
	if (!data) {
		return <LoadingPage />
	}
	return <VariantPage product={data} />
}
