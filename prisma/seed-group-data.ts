import { ItemGender } from './generated/enums'

export const groupsData: { title: string; slug: string; gender: ItemGender }[] =
	[
		// -------- MEN --------
		{
			title: 'Футболки',
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
			title: 'Шорты',
			slug: 'shorts-male',
			gender: 'male' as ItemGender,
		},
		{
			title: 'Рубашки',
			slug: 'rubashka-male',
			gender: 'male' as ItemGender,
		},
		{
			title: 'Толстовки',
			slug: 'sweatshirt-male',
			gender: 'male' as ItemGender,
		},

		// -------- WOMEN --------
		{
			title: 'Футболки',
			slug: 'futbolki-female',
			gender: 'female' as ItemGender,
		},
		{ title: 'Худи', slug: 'hoodie-female', gender: 'female' as ItemGender },
		{ title: 'Платья', slug: 'dresses-female', gender: 'female' as ItemGender },
		{
			title: 'Брюки',
			slug: 'trousers-female',
			gender: 'female' as ItemGender,
		},
		{
			title: 'Толстовки',
			slug: 'sweatshirt-female',
			gender: 'female' as ItemGender,
		},
		{
			title: 'Шорты',
			slug: 'shorts-female',
			gender: 'female' as ItemGender,
		},

		// -------- KIDS --------
		{
			title: 'Футболки',
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
