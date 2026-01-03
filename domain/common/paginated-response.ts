import { PaginationMeta } from './pagination.types'

export interface PaginatedResponse<T> {
	data: T[]
	meta: PaginationMeta
}
