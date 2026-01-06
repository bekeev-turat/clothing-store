import { NextResponse } from 'next/server'
import { getStripe } from '@/shared/lib'

interface Params {
	id: string
}

export async function GET(req: Request, { params }: { params: Params }) {
	// export async function GET(_req: Request, { params }: { params: Params }) {
	// 	console.log('CTX:', id)
	// 	return NextResponse.json({ ok: true })
	// }
	try {
		const { id } = await params

		if (!id) {
			return NextResponse.json(
				{ message: `Session ID is required ${id}` },
				{ status: 400 },
			)
		}

		const stripe = getStripe()

		// Проверяем что id передался
		console.log('Stripe session id:', id)

		const session = await stripe.checkout.sessions.retrieve(id)

		if (!session || !session.metadata?.orderId) {
			return NextResponse.json({ message: 'Order not found' }, { status: 404 })
		}

		return NextResponse.json({ orderId: session.metadata.orderId })
	} catch (e) {
		console.error('[STRIPE_SESSION_API_ERROR]', e)
		return NextResponse.json(
			{ message: 'Failed to get Stripe session' },
			{ status: 500 },
		)
	}
}
