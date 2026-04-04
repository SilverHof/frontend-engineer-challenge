import { pluginClient } from '@kubb/plugin-client'
import { pluginMsw } from '@kubb/plugin-msw'
import { pluginOas } from '@kubb/plugin-oas'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginZod } from '@kubb/plugin-zod'
import { kebabCase } from 'change-case'

import { GENERATOR_IMPORT_CLIENT_PATH } from './generator.constants'

export const pluginOasConfig = pluginOas({ generators: [] })

export const pluginClientConfig = pluginClient({
  output: {
    path: './__resources__',
    barrelType: 'all',
  },
  group: {
    type: 'path',
    name: ({ group }: { group: string }) => kebabCase(group),
  },
  importPath: GENERATOR_IMPORT_CLIENT_PATH,
  transformers: {
    name: (name: string, type?: string) => {
      if (type === 'file') return kebabCase(name)
      return name
    },
  },
})

export const pluginTsConfig = pluginTs({
  output: {
    path: './__types__',
    barrelType: 'all',
  },
  group: {
    type: 'path',
    name: ({ group }) => kebabCase(group),
  },
  enumType: 'asConst',
  enumSuffix: 'Enum',
  dateType: 'string',
  unknownType: 'unknown',
  optionalType: 'questionTokenAndUndefined',
  syntaxType: 'interface',
  transformers: {
    name: (name, type) => {
      if (type === 'file') return kebabCase(name)
      return name
    },
  },
})

export const pluginZodConfig = pluginZod({
  output: {
    path: './__schemas__',
    barrelType: 'all',
  },
  version: '4',
  group: { type: 'path', name: ({ group }) => kebabCase(`${group}-schemas`) },
  typed: true,
  dateType: 'stringOffset',
  unknownType: 'unknown',
  importPath: 'zod',
  transformers: {
    name: (name, type) => {
      if (type === 'file') return kebabCase(name)
      return name
    },
  },
})

export const pluginMswConfig = pluginMsw({
  output: {
    path: './__mocks__',
    barrelType: 'named',
    banner: '/* eslint-disable no-alert, no-console */',
    footer: '',
  },
  group: { type: 'path', name: ({ group }) => kebabCase(`${group}-mocks`) },
  handlers: true,
})
