export const ROUTE_MAP = {
	home: '/',
	cart: '/cart',
	favorites: '/favorites',
	profile: '/profile',

	search: '/search',
	
	auth: {
		login: '/auth/login',
		register: '/auth/register',
		resetName: 'auth/reset-name',
		resetPassword: 'auth/reset-password',
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


	// category: {
	// 	men: '/category/men',
	// 	women: '/category/women',
	// 	kids: '/category/kids',
	// },