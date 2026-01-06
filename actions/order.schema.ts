import { z } from 'zod'

export const CreateOrderSchema = z.object({
	userId: z.string().uuid('Некорректный ID пользователя'),
	items: z
		.array(
			z.object({
				variantId: z.string().uuid('Некорректный ID варианта товара'),
				quantity: z.number().int().positive('Количество должно быть больше 0'),
				price: z.number().positive('Цена должна быть положительной'),
				size: z.string(), // Добавляем размер, так как Stock привязан к нему
			}),
		)
		.min(1, 'Заказ не может быть пустым'),
	address: z.object({
		firstName: z.string().min(2, 'Имя слишком короткое'),
		lastName: z.string().min(2, 'Фамилия слишком короткая'),
		address: z.string().min(5, 'Укажите полный адрес'),
		address2: z.string().optional(),
		city: z.string().min(2, 'Укажите город'),
		zip: z.string().regex(/^\d{5,6}$/, 'Некорректный почтовый индекс'),
		phone: z
			.string()
			.regex(/^\+?[1-9]\d{1,14}$/, 'Некорректный номер телефона'),
	}),

})

export type CreateOrderInput = z.infer<typeof CreateOrderSchema>
