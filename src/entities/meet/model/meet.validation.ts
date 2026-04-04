import * as yup from 'yup'

import type { TranslateFunction } from '@/shared/libraries/i18n'

export const createMeetValidationSchema = (t: TranslateFunction) =>
  yup.object().shape({
    name: yup.string(),
    url: yup.string().url(t('meet_create.validation.url_invalid')).required(t('meet_create.validation.url_required')),
    recorderConfig: yup.string().required(t('meet_create.validation.recorder_required')),
    storageConfig: yup.string().required(t('meet_create.validation.storage_required')),
    summarization: yup.boolean(),
    transcription: yup.boolean(),
    meetStartAt: yup
      .string()
      .required(t('meet_create.validation.start_time_required'))
      .test('is-future', t('meet_create.validation.start_time_past'), (value) => {
        if (!value) return true
        return new Date(value) >= new Date()
      }),
    meetEndAt: yup
      .string()
      .required(t('meet_create.validation.end_time_required'))
      .test('is-after-start', t('meet_create.validation.end_time_before_start'), function (value) {
        const { meetStartAt } = this.parent
        if (!value || !meetStartAt) return true
        return new Date(value) > new Date(meetStartAt)
      }),
  })
