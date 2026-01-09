export const ROUTE_MAP = {
	home: '/',
	cart: {
		root: '/cart',
		checkout: '/checkout',
		address: '/checkout/address',
	},
	favorites: '/favorites',
	profile: '/profile',

	search: '/search',

	catalog: {
		male: '/?gender=male',
		female: '/?gender=female',
		child: '/?gender=child',
		unisex: '/?gender=unisex',
		detail: (slug: string) => `/?groupSlug=${slug}`,
	},
	auth: {
		login: '/auth/login',
		register: '/auth/register',
		resetName: '/auth/reset-name',
		resetPassword: '/auth/reset-password',
	},

	orders: {
		root: '/orders',
		detail: (id: string | number) => `/orders/${id}`,
	},

	product: {
		root: '/product',
		detail: (id: string) => `/product/${id}`,
	},

	admin: {
		root: '/admin',
		groups: '/admin/groups',
		products: '/admin/products',
		orders: '/admin/orders',
		users: '/admin/users',
	},
} as const
