import { ROUTE_MAP } from '@/shared/config/routes'
import Link from 'next/link'

export const Footer = () => (
	<footer className='flex justify-center py-6 text-sm text-gray-600'>
		<Link href={ROUTE_MAP.home} className='flex gap-1 items-center'>
			<span className='font-serif font-semibold'>BeUp</span>
			<span> &mdash; Shop</span>
			<span> © {new Date().getFullYear()}</span>
		</Link>
	</footer>
)
