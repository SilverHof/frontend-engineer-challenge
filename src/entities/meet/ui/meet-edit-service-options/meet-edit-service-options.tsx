import { Switch, Tooltip } from '@ant-core/ui'
import { CircleAlert } from 'lucide-react'
import { Controller, useFormContext } from 'react-hook-form'

import { useTranslate } from '@/shared/libraries/i18n'

import { meetEditServiceOptionsStyles } from './meet-edit-service-options.styles'

interface MeetEditServiceOptionsProps {
  transcriptionEnabled: boolean
}

export const MeetEditServiceOptions = ({ transcriptionEnabled }: MeetEditServiceOptionsProps) => {
  const { control } = useFormContext()
  const { t } = useTranslate()

  const styles = meetEditServiceOptionsStyles()

  return (
    <div className={styles.container()}>
      <div className={styles.optionWrapper()}>
        <Controller
          name='transcription'
          control={control}
          render={({ field }) => (
            <div className={styles.switchContainer()}>
              <Switch
                isSelected={field.value as boolean}
                onValueChange={(value) => {
                  field.onChange(value)
                }}
                isDisabled
                data-testid='meet-create-transcription-switch'
              />
              <span className={styles.label()}>{t('meet_create.fields.transcription')}</span>
            </div>
          )}
        />
        <span className={styles.description()}>{t('meet_create.fields.transcription_description')}</span>
        <span className={styles.price()}>{t('meet_create.fields.transcription_price')}</span>
      </div>

      <div className={styles.optionWrapper()}>
        <Controller
          name='summarization'
          control={control}
          render={({ field }) => (
            <div className={styles.switchContainer()}>
              <Switch
                isSelected={field.value as boolean}
                onValueChange={(value) => {
                  field.onChange(value)
                }}
                isDisabled
                data-testid='meet-create-summarization-switch'
              />
              <span className={transcriptionEnabled ? styles.label() : styles.labelDisabled()}>
                {t('meet_create.fields.summarization')}
              </span>
              {!transcriptionEnabled && (
                <Tooltip content={t('meet_create.fields.summarization_requires_transcription')}>
                  <CircleAlert className={styles.tooltipIcon()} />
                </Tooltip>
              )}
            </div>
          )}
        />
        <span className={styles.description()}>{t('meet_create.fields.summarization_description')}</span>
        <span className={styles.price()}>{t('meet_create.fields.summarization_price')}</span>
      </div>
    </div>
  )
}
