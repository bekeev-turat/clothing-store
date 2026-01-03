import { UserRole } from '@/prisma/generated/enums'
import { ShieldCheck } from 'lucide-react'

// Вынос маленьких элементов (S в SOLID)
export const RoleBadge = ({ role }: { role: UserRole }) => {
	const styles = {
		[UserRole.ADMIN]: 'bg-purple-100 text-purple-700',
		[UserRole.MODERATOR]: 'bg-amber-100 text-amber-700',
		[UserRole.MEMBER]: 'bg-blue-100 text-blue-700',
	}

	return (
		<span
			className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[role]}`}
		>
			{role === UserRole.ADMIN && <ShieldCheck size={12} />}
			{role}
		</span>
	)
}
