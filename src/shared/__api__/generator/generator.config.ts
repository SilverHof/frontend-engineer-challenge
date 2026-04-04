import { defineConfig } from '@kubb/core'

import { GENERATOR_INPUT_PATH, GENERATOR_OUTPUT_PATH } from './generator.constants.ts'
import {
  pluginClientConfig,
  pluginMswConfig,
  pluginOasConfig,
  pluginTsConfig,
  pluginZodConfig,
} from './generator.plugins.ts'

export default defineConfig({
  root: '.',
  input: {
    path: GENERATOR_INPUT_PATH,
  },
  output: {
    path: GENERATOR_OUTPUT_PATH,
    extension: { '.ts': '' },
    barrelType: 'all',
  },
  hooks: {
    done: [`pnpm api:format`],
  },
  plugins: [pluginOasConfig, pluginClientConfig, pluginTsConfig, pluginZodConfig, pluginMswConfig],
})
