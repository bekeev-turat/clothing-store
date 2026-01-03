import Image from 'next/image'
import { getProfileAction } from '@/actions/account.actions'

const ProfilePage = async () => {
	const { data: user, error } = await getProfileAction()

	if (!user || error) {
		return (
			<div className='flex items-center justify-center h-screen'>
				<p className='text-red-500 font-medium'>
					Пользователь не найден в базе данных
				</p>
			</div>
		)
	}

	return (
		<div className='max-w-2xl mx-auto p-6'>
			<h1 className='antialiased text-4xl font-semibold my-7'>Профиль</h1>

			<div className='bg-white shadow-md rounded-lg p-6 border border-gray-100'>
				<div className='flex items-center gap-6 mb-8'>
					{/* Аватар */}
					<div className='relative w-24 h-24'>
						{user.avatar ? (
							<Image
								src={user.avatar}
								alt={user.username}
								fill
								className='rounded-full object-cover'
							/>
						) : (
							<div className='w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-500'>
								{user.username[0].toUpperCase()}
							</div>
						)}
					</div>

					<div>
						<h2 className='text-2xl font-bold'>{user.username}</h2>
						<p className='text-gray-500'>{user.email}</p>
						<span
							className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
								user.role === 'ADMIN'
									? 'bg-red-100 text-red-700'
									: 'bg-blue-100 text-blue-700'
							}`}
						>
							{user.role}
						</span>
					</div>
				</div>

				<div className='space-y-4'>
					<div className='border-t pt-4'>
						<h3 className='text-sm font-medium text-gray-400 uppercase'>
							ID Аккаунта
						</h3>
						<p className='font-mono text-sm'>{user.id}</p>
					</div>

					<div className='border-t pt-4'>
						<h3 className='text-sm font-medium text-gray-400 uppercase'>
							Дата регистрации
						</h3>
						<p>{new Date(user.createdAt).toLocaleDateString('ru-RU')}</p>
					</div>
				</div>
			</div>

			{/* Отладочная информация */}
			<details className='mt-10'>
				<summary className='cursor-pointer text-gray-400 hover:text-gray-600 transition-colors'>
					Raw Session Data
				</summary>
				<pre className='bg-gray-50 p-4 rounded mt-2 text-xs overflow-auto'>
					{JSON.stringify(user, null, 2)}
				</pre>
			</details>
		</div>
	)
}

export default ProfilePage
