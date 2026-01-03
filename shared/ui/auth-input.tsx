// src/shared/ui/Input.tsx
'use client'
import { useState } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react' // Установите lucide-react

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string
	error?: string
	registration: UseFormRegisterReturn
}

export const AuthInput = ({
	label,
	error,
	registration,
	type,
	...props
}: InputProps) => {
	const [showPassword, setShowPassword] = useState(false)

	const isPassword = type === 'password'
	const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

	return (
		<div className='w-full space-y-1'>
			{label && (
				<label className='block text-sm font-medium text-gray-700'>
					{label}
				</label>
			)}
			<div className='relative'>
				<input
					{...registration}
					{...props}
					type={inputType}
					className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all ${
						error ? 'border-red-500' : 'border-gray-300'
					}`}
				/>

				{isPassword && (
					<button
						type='button'
						onClick={() => setShowPassword(!showPassword)}
						className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors'
					>
						{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
					</button>
				)}
			</div>
			{error && <p className='text-xs text-red-500 mt-1'>{error}</p>}
		</div>
	)
}
