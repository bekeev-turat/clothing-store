import { ItemGender } from '@/prisma/generated/enums'
import { z } from 'zod'
export const GenderSchema = z.enum(ItemGender).optional()

export type GenderDTO = z.infer<typeof GenderSchema>
