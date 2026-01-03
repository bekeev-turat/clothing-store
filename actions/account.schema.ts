import { z } from 'zod'

// Схема для обновления профиля
export const UpdateProfileSchema = z.object({
	username: z.string().min(2, 'Имя должно быть не менее 2 символов').optional(),
	avatar: z
		.string()
		.url('Некорректная ссылка на аватар')
		.optional()
		.transform((v) => v || null),

	password: z
		.string()
		.min(6, 'Пароль должен быть не менее 6 символов')
		.optional(),
})

// Схема для смены роли (админка)
export const ChangeRoleSchema = z.object({
	targetUserId: z.string().uuid('Некорректный ID пользователя'),
	role: z.enum(['ADMIN', 'MEMBER', 'MODERATOR']),
})

// Схема для регистрации (если планируете делать кастомную)
export const RegisterSchema = z.object({
	email: z.string().email('Некорректный формат email'),
	username: z.string().min(2, 'Имя обязательно'),
	password: z.string().min(6, 'Минимум 6 символов'),
})
