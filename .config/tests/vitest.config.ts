import react from '@vitejs/plugin-react'
import { loadEnv } from 'vite'
import magicalSvg from 'vite-plugin-magical-svg'
import { configDefaults, defineConfig } from 'vitest/config'

import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    magicalSvg({
      target: 'react',
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'istanbul',
      reporter: ['clover', 'json', 'lcov', 'text'],
      reportsDirectory: './__tests__/coverage',
      exclude: [
        ...(configDefaults.coverage?.exclude || []),
        './public/**',
        './src/shared/assets/**',
        './src/pages/**',
        './src/app/**',
        './.storybook/**',
        './next.config.mjs',
        './plopfile.js',
        './postcss.config.js',
        './sentry.base.config.ts',
        './sentry.client.config.ts',
        './sentry.edge.config.ts',
        './sentry.server.config.ts',
        './tailwind.config.ts',
        './instrumentation.ts',
        '**/{cache}',
      ],
    },
    env: loadEnv('', process.cwd(), ''),
    css: false,
    deps: {
      optimizer: {
        web: {
          enabled: true,
        },
      },
    },
  },
})
