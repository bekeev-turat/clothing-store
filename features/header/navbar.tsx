'use client'

import { ROUTE_MAP } from '@/shared/config/routes'
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks'
import { openMenu } from '@/features/cart/store/ui/ui.slice'
import Link from 'next/link'
import { FaSearch, FaShoppingBasket, FaChevronDown } from 'react-icons/fa'
import { MdMenuOpen } from 'react-icons/md'
import { NavMenu } from '../../shared/ui/nav-menu'
import { GroupWithCountDTO } from '@/shared/lib/zod/groups.schema'

const navLinkClass =
	'relative group font-bold text-2xl transition-colors duration-300 hover:text-primary'
const underlineClass =
	"after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full"
interface NavbarProps {
	groups: GroupWithCountDTO[]
}

export const Navbar = ({ groups }: NavbarProps) => {
	const totalItems = useAppSelector((state) => state.cart.totalItems)
	const dispatch = useAppDispatch()

	return (
		<div className='max-w-7xl mx-auto flex justify-between items-center gap-4 px-6'>
			<Link
				href={ROUTE_MAP.home}
				className='font-black text-3xl text-primary hover:scale-105 transition-transform'
			>
				BeUp
			</Link>

			<nav className='hidden sm:flex gap-10 items-center'>
				{/* ГРУППА МАГАЗИН */}
				<div className='group/menu py-2'>
					<button className={`${navLinkClass} flex items-center gap-2`}>
						Магазин
						<FaChevronDown className='text-sm transition-transform duration-300 group-hover/menu:rotate-180' />
						<span className={underlineClass}></span>
					</button>
					<NavMenu groups={groups} />
				</div>

				<Link
					href={ROUTE_MAP.search}
					className={`${navLinkClass} ${underlineClass} flex items-center gap-2`}
				>
					<FaSearch className='text-xl group-hover:rotate-12 transition-transform' />
					Поиск
				</Link>

				<Link
					href={ROUTE_MAP.cart}
					className={`${navLinkClass} ${underlineClass} flex items-center gap-2`}
				>
					<FaShoppingBasket className='text-xl group-hover:-translate-y-1 transition-transform' />
					Корзина {`[${totalItems}]`}
				</Link>

				<button
					onClick={() => dispatch(openMenu())}
					className={`${navLinkClass} ${underlineClass} flex items-center gap-2`}
				>
					<MdMenuOpen className='text-3xl' />
					Меню
				</button>
			</nav>
		</div>
	)
}
