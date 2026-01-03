interface ConfirmModalProps {
	open: boolean
	onClose: () => void
	onConfirm: () => void
	title?: string
	description?: string
	confirmText?: string
	variant?: 'danger' | 'primary'
}

export function ConfirmModal({
	open,
	onClose,
	onConfirm,
	title = 'Вы уверены?',
	description,
	confirmText = 'Подтвердить',
	variant = 'primary',
}: ConfirmModalProps) {
	if (!open) return null

	return (
		<div
			className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4'
			onClick={onClose}
		>
			<div
				className='w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl'
				onClick={(e) => e.stopPropagation()}
			>
				<h3 className='text-lg font-bold text-gray-900'>{title}</h3>
				{description && (
					<p className='mt-2 text-sm text-gray-500'>{description}</p>
				)}

				<div className='mt-6 flex justify-end gap-3'>
					<button
						onClick={onClose}
						className='px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg'
					>
						Отмена
					</button>
					<button
						onClick={() => {
							onConfirm()
							onClose()
						}}
						className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${
							variant === 'danger'
								? 'bg-red-600 hover:bg-red-700'
								: 'bg-blue-600 hover:bg-blue-700'
						}`}
					>
						{confirmText}
					</button>
				</div>
			</div>
		</div>
	)
}
