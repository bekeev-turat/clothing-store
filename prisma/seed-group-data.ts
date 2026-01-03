import { ItemGender } from './generated/enums'

export const groupsData: { title: string; slug: string; gender: ItemGender }[] =
	[
		// -------- MEN --------
		{
			title: 'Футболки мужские',
			slug: 'futbolki-male',
			gender: 'male' as ItemGender,
		},
		{ title: 'Худи', slug: 'hoodie-male', gender: 'male' as ItemGender },
		{ title: 'Штаны', slug: 'pants-male', gender: 'male' as ItemGender },
		{
			title: 'Аксессуары',
			slug: 'accessories-male',
			gender: 'male' as ItemGender,
		},
		{
			title: 'Мужские шорты',
			slug: 'shorts-male',
			gender: 'male' as ItemGender,
		},
		{
			title: 'Мужские толстовки',
			slug: 'sweatshirt-male',
			gender: 'male' as ItemGender,
		},

		// -------- WOMEN --------
		{
			title: 'Футболки женские',
			slug: 'futbolki-female',
			gender: 'female' as ItemGender,
		},
		{ title: 'Худи', slug: 'hoodie-female', gender: 'female' as ItemGender },
		{ title: 'Платья', slug: 'dresses-female', gender: 'female' as ItemGender },
		{
			title: 'Женские брюки',
			slug: 'trousers-female',
			gender: 'female' as ItemGender,
		},
		{
			title: 'Женские толстовки',
			slug: 'sweatshirt-female',
			gender: 'female' as ItemGender,
		},
		{
			title: 'Женские шорты',
			slug: 'shorts-female',
			gender: 'female' as ItemGender,
		},

		// -------- KIDS --------
		{
			title: 'Футболки детские',
			slug: 'futbolki-child',
			gender: 'child' as ItemGender,
		},
		{ title: 'Шорты', slug: 'shorts-child', gender: 'child' as ItemGender },

		// -------- UNISEX --------
		{
			title: 'Толстовки',
			slug: 'sweatshirts-unisex',
			gender: 'unisex' as ItemGender,
		},
	]

export const groups: Record<
	string,
	{ id: string; title: string; slug: string; gender: string | null }
> = {}
