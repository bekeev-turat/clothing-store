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
})

export type CreateOrderInput = z.infer<typeof CreateOrderSchema>
