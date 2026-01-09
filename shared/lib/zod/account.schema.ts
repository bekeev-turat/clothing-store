import { UserRole } from '@/prisma/generated/enums'
import { z } from 'zod'
/**
 *  Схема для обновления профиля
 */
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

/*
 * Схема для смены роли (админка)
 **/
export const ChangeRoleSchema = z.object({
	userId: z.string().min(1, 'ID пользователя обязателен'),

	role: z.nativeEnum(UserRole, {
		message: 'Выбрана недопустимая роль',
	}),
})
/*
 * Схема для регистрации
 **/
export const RegisterSchema = z.object({
	email: z.string().email('Некорректный формат email'),
	username: z.string().min(3, 'Имя обязательно'),
	password: z.string().min(6, 'Минимум 6 символов'),
})
/*
 * Схема для удаления пользователя
 **/
export const DeleteUserSchema = z.object({
	userId: z.string().min(1, 'ID пользователя обязателен'),
})

export const UserFiltersSchema = z.object({
	query: z.string().optional(),
	role: z.enum(['ALL', 'ADMIN', 'USER']).default('ALL'),
	page: z.coerce.number().min(1).default(1),
	limit: z.coerce.number().min(1).max(100).default(10),
	sortBy: z.enum(['createdAt', 'username']).default('createdAt'),
	sortOrder: z.enum(['asc', 'desc']).default('desc'),
})

// Тип, который можно использовать в коде

export type TDeleteUserSchema = z.infer<typeof DeleteUserSchema>
export type TChangeRoleSchema = z.infer<typeof ChangeRoleSchema>
export type TUpdateProfileSchema = z.infer<typeof UpdateProfileSchema>
export type TRegisterSchema = z.infer<typeof RegisterSchema>
export type TUserFiltersSchema = z.infer<typeof UserFiltersSchema>
