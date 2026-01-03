'use client'

import { ROUTE_MAP } from '@/shared/config/routes'
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks'
import { openMenu } from '@/features/cart/store/ui/ui.slice'
import Link from 'next/link'
import { FaSearch, FaShoppingBasket } from 'react-icons/fa'
import { MdMenuOpen } from 'react-icons/md'

const navLinkClass =
	'relative group font-bold text-2xl transition-colors duration-300 hover:text-primary'

const underlineClass =
	"after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full"

export const Header = () => {
	const totalItems = useAppSelector((state) => state.cart.totalItems)
	const dispatch = useAppDispatch()

	return (
		<header className='py-4 shadow-md'>
			<div className='max-w-7xl mx-auto flex justify-between items-center gap-4 px-6'>
				<Link
					href={ROUTE_MAP.home}
					className='font-black text-3xl text-primary hover:scale-105 transition-transform'
				>
					BeUp
				</Link>

				<nav className='hidden sm:flex gap-10 justify-between'>
					{/* <Link
						href={ROUTE_MAP.category.men}
						className={`${navLinkClass} ${underlineClass}`}
					>
						Мужское
					</Link>

					<Link
						href={ROUTE_MAP.category.women}
						className={`${navLinkClass} ${underlineClass}`}
					>
						Женское
					</Link>

					<Link
						href={ROUTE_MAP.category.kids}
						className={`${navLinkClass} ${underlineClass}`}
					>
						Детское
					</Link> */}

					<Link
						href={ROUTE_MAP.search}
						className={`${navLinkClass} ${underlineClass} flex items-center gap-2`}
					>
						<FaSearch className='transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110' />
						Поиск
					</Link>

					<Link
						href={ROUTE_MAP.cart}
						className={`${navLinkClass} ${underlineClass} flex items-center gap-2`}
					>
						<FaShoppingBasket className='transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110' />
						Корзина {`[${totalItems > 0 ? totalItems : 0}]`}
					</Link>
					<button
						onClick={() => dispatch(openMenu())}
						className={`${navLinkClass} ${underlineClass} flex items-center gap-2`}
					>
						<MdMenuOpen className='transition-transform scale-110 duration-300 group-hover:scale-130' />
						Меню
					</button>
				</nav>
			</div>
		</header>
	)
}
