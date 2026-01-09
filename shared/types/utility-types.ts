/**
 * Вспомогательный тип для извлечения типа значения, которое возвращает функция, обернутая в Promise.
 * Аналог стандартного Prisma.PromiseReturnType.
 */
export type PromiseReturnType<
	T extends (...args: never[]) => Promise<unknown>,
> = T extends (...args: never[]) => Promise<infer R> ? R : never
