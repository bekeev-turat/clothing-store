'use client'

export function ErrorPageUI({ reset }: { reset: () => void }) {
	return (
		<section className='min-h-[70vh] w-full flex items-center justify-center px-6'>
			<div className='max-w-md w-full text-center space-y-6'>
				<span className='inline-block rounded-full bg-red-100 px-4 py-1 text-sm font-medium text-red-600'>
					Error
				</span>

				<h2 className='text-2xl font-semibold tracking-tight'>
					Что-то пошло не так
				</h2>

				<p className='text-gray-500 leading-relaxed'>
					Мы не смогли загрузить запрашиваемые данные. Пожалуйста, попробуйте
					снова или обновите страницу.
				</p>

				<div className='flex justify-center gap-4'>
					<button
						onClick={reset}
						className='rounded-lg bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 transition'
					>
						Повторить
					</button>

					<button
						onClick={() => location.reload()}
						className='rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium hover:bg-gray-50 transition'
					>
						Перезагрузить страницу
					</button>
				</div>
			</div>
		</section>
	)
}
