import { Button } from '@/shared/ui'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'

export const AddressBackButton = ({ href }: { href: string }) => (
	<Button
		variant='ghost'
		size='sm'
		asChild
		className='mb-6 -ml-2 text-muted-foreground'
	>
		<Link href={href}>
			<ChevronLeft className='w-4 h-4 mr-1' />
			Назад в корзину
		</Link>
	</Button>
)
