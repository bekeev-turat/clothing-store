import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
	test: {
		globals: true, // Позволяет не импортировать describe, it, expect
		environment: 'node',
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './'),
		},
	},
})
