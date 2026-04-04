import { createHttpMockRoutes } from '@/shared/libraries/msw'

export const MEDIA_TASK_MOCK = {
  id: '@guid',
  file: {
    originalName: '@word.mp4',
  },
  status:
    '@pick(["CREATED", "TRANSCRIBE", "TRANSCRIBE_COMPLETED", "TRANSCRIBE_ERROR", "SUMMARY", "SUMMARY_COMPLETED", "SUMMARY_ERROR"])',
  dateCreate: '@datetime',
  transcriptionResult: {
    id: '@guid',
    status: '@pick(["CREATED", "TRANSCRIBE", "TRANSCRIBE_COMPLETED", "TRANSCRIBE_ERROR"])',
    dateCreate: '@datetime',
    dateUpdate: '@datetime',
    // Массив из 10 сегментов транскрипции
    'segments|10': [
      {
        start: '@integer(0, 600)',
        end: '@integer(0, 600)',
        text: '@sentence(3, 12)',
        speaker: '@word',
      },
    ],
  },
}

export const MEDIA_TASK_STATUS_HISTORY_MOCK = {
  id: '@guid',
  status:
    '@pick(["CREATED", "TRANSCRIBE", "TRANSCRIBE_COMPLETED", "TRANSCRIBE_ERROR", "SUMMARY", "SUMMARY_COMPLETED", "SUMMARY_ERROR"])',
  date: '@datetime',
  dateCreate: '@datetime',
  dateUpdate: '@datetime',
}

export const MEDIA_TASKS_MOCK_ROUTES = createHttpMockRoutes({
  mockTemplate: MEDIA_TASK_MOCK,
  routes: [
    {
      method: 'GET',
      path: '/media_tasks',
      type: 'collection',
    },
    {
      method: 'GET',
      path: '/media_tasks/:id',
      type: 'single',
    },
    {
      method: 'POST',
      path: '/media_tasks',
    },
    {
      method: 'PUT',
      path: '/media_tasks/:id',
    },
    {
      method: 'PATCH',
      path: '/media_tasks/:id',
    },
    {
      method: 'DELETE',
      path: '/media_tasks/:id',
    },
  ],
})

export const MEDIA_TASK_STATUS_HISTORY_MOCK_ROUTES = createHttpMockRoutes({
  mockTemplate: MEDIA_TASK_STATUS_HISTORY_MOCK,
  routes: [
    {
      method: 'GET',
      path: '/media_tasks/:id/history_statuses',
      type: 'collection',
    },
  ],
})
