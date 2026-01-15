import { groups } from './seed-group-data'

export const itemsMaleData = [
	{
		name: 'Diesel хлопковая футболка',
		description: 'Футболка из органического хлопка премиум-класса от Diesel.',
		brand: 'Diesel',
		slug: 'diesel-a11302-0hgam',
		price: 18450,
		gender: 'male',
		tags: ['organic cotton', 'premium'],

		composition: ['Хлопок: 100%'],
		code: '6289159',
		modelHeight: 188,
		modelSize: 'L',
		measurements:
			'Обхват груди 122 см, длина рукава от горловины 45 см, длина изделия по спинке 73 см.',

		groupId: groups['futbolki-male'].id,

		variants: [
			{
				color: 'Черный',
				availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
				stock: [
					{ size: 'XS', quantity: 5 },
					{ size: 'S', quantity: 10 },
					{ size: 'M', quantity: 8 },
					{ size: 'L', quantity: 6 },
					{ size: 'XL', quantity: 4 },
				],

				images: [
					'/imgs/Мужская_черная_хлопковая_футболка_DIESEL .jpg',
					'/imgs/Мужская_черная_хлопковая_футболка_DIESEL_1 .jpg',
					'/imgs/Мужская_черная_хлопковая_футболка_DIESEL_3 .jpg',
					'/imgs/Мужская_черная_хлопковая_футболка_DIESEL_4 .jpg',
					'/imgs/Мужская_черная_хлопковая_футболка_DIESEL_5 .jpg',
				],
			},
			{
				color: 'Белый',
				availableSizes: ['S', 'M', 'L'],
				stock: [
					{ size: 'XS', quantity: 5 },
					{ size: 'S', quantity: 10 },
					{ size: 'M', quantity: 8 },
					{ size: 'L', quantity: 6 },
					{ size: 'XL', quantity: 4 },
				],

				images: [
					'/imgs/Мужская_белая_хлопковая_футболка_DIESEL .jpg',
					'/imgs/Мужская_белая_хлопковая_футболка_DIESEL_1 .jpg',
					'/imgs/Мужская_белая_хлопковая_футболка_DIESEL_2 .jpg',
					'/imgs/Мужская_белая_хлопковая_футболка_DIESEL_3 .jpg',
					'/imgs/Мужская_белая_хлопковая_футболка_DIESEL_5 .jpg',
				],
			},
		],
	},
	{
		name: 'Хлопковый свитшот Sporty & Rich x UCLA',
		description:
			'Хлопковый свитшот из коллаборации с Калифорнийским университетом украсили принтом UCLA спереди и логотипом Sporty & Rich сзади. Пояс, манжеты и горловину выполнили из трикотажа в рубчик.',
		brand: 'Sporty&Rich',
		slug: 'sporty&rich-st075-7bli16',
		price: 25400,
		gender: 'male',
		tags: ['organic cotton', 'premium'],

		composition: ['Хлопок: 100%'],
		code: '7048276',
		modelHeight: 188,
		modelSize: 'L',
		measurements:
			'Обхват груди 114 см, длина рукава от горловины 85 см, длина изделия по спинке 68 см. На мужской модели: размер L. Рост: 188 см. Параметры изделия для размера L: Обхват груди 132 см, длина рукава от горловины 85 см, длина изделия по спинке 72 см.',
		groupId: groups['sweatshirt-male'].id,

		variants: [
			{
				color: 'Голубой',
				availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
				stock: [
					{ size: 'S', quantity: 10 },
					{ size: 'M', quantity: 8 },
					{ size: 'L', quantity: 6 },
					{ size: 'XL', quantity: 0 },
					{ size: 'XXL', quantity: 4 },
				],

				images: [
					'/imgs/khlopkovyi-svitshot-sporty-rich-x-ucla-sporty-and-rich-goluboi-0.jpg',
					'/imgs/khlopkovyi-svitshot-sporty-rich-x-ucla-sporty-and-rich-goluboi-1.jpg',
					'/imgs/khlopkovyi-svitshot-sporty-rich-x-ucla-sporty-and-rich-goluboi-3.jpg',
					'/imgs/khlopkovyi-svitshot-sporty-rich-x-ucla-sporty-and-rich-goluboi-4.jpg',
					'/imgs/khlopkovyi-svitshot-sporty-rich-x-ucla-sporty-and-rich-goluboi-5.jpg',
				],
			},
		],
	},
	{
		name: 'Хлопковые шорты Sporty & Rich x UCLA',
		description:
			'Шорты с эластичным поясом, задним и боковыми карманами сшили из хлопкового трикотажа плотностью 9 унций. Окрашенную в готовом виде модель декорировали логотипом и монограммой UCLA.',
		brand: 'Sporty&Rich',
		slug: 'sporty&rich-sh0396-6bld16',
		price: 17400,
		gender: 'male',
		tags: ['organic cotton', 'premium'],

		composition: ['Хлопок: 100%'],
		code: '7048275',
		modelHeight: 188,
		modelSize: 'L',
		measurements: 'Обхват талии 80 см, длина изделия (по боковому шву) 46 см.',
		groupId: groups['shorts-male'].id,

		variants: [
			{
				color: 'Голубой',
				availableSizes: ['S', 'M', 'L', 'XL', 'XXL'],
				stock: [
					{ size: 'S', quantity: 10 },
					{ size: 'M', quantity: 8 },
					{ size: 'L', quantity: 6 },
					{ size: 'XL', quantity: 0 },
					{ size: 'XXL', quantity: 4 },
				],

				images: [
					'/imgs/khlopkovye-shorty-sporty-rich-x-ucla-sporty-and-rich-goluboi-0.jpg',
					'/imgs/khlopkovye-shorty-sporty-rich-x-ucla-sporty-and-rich-goluboi-1.jpg',
					'/imgs/khlopkovye-shorty-sporty-rich-x-ucla-sporty-and-rich-goluboi-3.jpg',
					'/imgs/khlopkovye-shorty-sporty-rich-x-ucla-sporty-and-rich-goluboi-4.jpg',
					'/imgs/khlopkovye-shorty-sporty-rich-x-ucla-sporty-and-rich-goluboi-5.jpg',
				],
			},
		],
	},
	{
		name: 'HUGO Blue Хлопковые шорты',
		description:
			'Для пошива шортов длиной чуть выше колена использовали хлопковый трикотаж. Модель с поясом-кулиской, боковыми и накладным задним карманами декорировали крупным принтом в спортивном стиле.',
		brand: 'HUGO Blue',
		slug: 'hugoblue-054dse-419d8',
		price: 12500,
		gender: 'male',
		tags: ['organic cotton', 'premium'],

		composition: ['Хлопок: 100%'],
		code: '7048782',
		modelHeight: 188,
		modelSize: 'M',
		measurements: 'Обхват талии 84 см, длина изделия (по боковому шву) 51 см.',
		groupId: groups['shorts-male'].id,

		variants: [
			{
				color: 'Голубой',
				availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
				stock: [
					{ size: 'XS', quantity: 10 },
					{ size: 'S', quantity: 10 },
					{ size: 'M', quantity: 8 },
					{ size: 'L', quantity: 0 },
					{ size: 'XL', quantity: 0 },
					{ size: 'XXL', quantity: 4 },
				],

				images: [
					'/imgs/khlopkovye-shorty-hugo-blue-goluboi-0.jpg',
					'/imgs/khlopkovye-shorty-hugo-blue-goluboi-1.jpg',
					'/imgs/khlopkovye-shorty-hugo-blue-goluboi-3.jpg',
					'/imgs/khlopkovye-shorty-hugo-blue-goluboi-4.jpg',
					'/imgs/khlopkovye-shorty-hugo-blue-goluboi-5.jpg',
				],
			},
			{
				color: 'Черный',
				availableSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
				stock: [
					{ size: 'XS', quantity: 10 },
					{ size: 'S', quantity: 10 },
					{ size: 'M', quantity: 8 },
					{ size: 'L', quantity: 6 },
					{ size: 'XL', quantity: 0 },
					{ size: 'XXL', quantity: 4 },
				],

				images: [
					'/imgs/khlopkovye-shorty-hugo-blue-chernyi-0.jpg',
					'/imgs/khlopkovye-shorty-hugo-blue-chernyi-1.jpg',
					'/imgs/khlopkovye-shorty-hugo-blue-chernyi-3.jpg',
					'/imgs/khlopkovye-shorty-hugo-blue-chernyi-4.jpg',
					'/imgs/khlopkovye-shorty-hugo-blue-chernyi-5.jpg',
				],
			},
		],
	},
]
