import {
	LayoutDashboard,
	ShoppingBag,
	Users,
	FolderTree,
	Settings,
} from 'lucide-react'
import { ROUTE_MAP } from '@/shared/config/routes'

export const ADMIN_MENU = [
	{ label: 'Дашборд', href: ROUTE_MAP.admin.root, icon: LayoutDashboard },
	{ label: 'Товары', href: ROUTE_MAP.admin.products, icon: ShoppingBag },
	{ label: 'Группы/Категории', href: ROUTE_MAP.admin.groups, icon: FolderTree },
	{ label: 'Пользователи', href: ROUTE_MAP.admin.users, icon: Users },
	{ label: 'Заказы', href: ROUTE_MAP.admin.orders, icon: Settings },
]

export type AdminMenuItem = (typeof ADMIN_MENU)[number]
