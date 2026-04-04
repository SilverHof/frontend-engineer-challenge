import { useMemo } from 'react'
import { Controller, useWatch } from 'react-hook-form'

import { MeetEditFormValues } from '@/pages/meet-edit-page'

import { useTranslate } from '@/shared/libraries/i18n'
import { CustomButton, CustomInput } from '@/shared/ui'

import { MeetEditServiceOptions } from '../meet-edit-service-options'
import { meetEditFormStyles } from './meet-edit-form.styles'

interface MeetEditFormProps {
  meetEditForm: ReturnType<typeof import('@/shared/libraries/react-hook-form').useFormInitializer<MeetEditFormValues>>
  onSubmit: (values: MeetEditFormValues) => Promise<void>
  onCancel: () => void
  isLoading: boolean
}

export const MeetEditForm = ({ meetEditForm, onSubmit, onCancel, isLoading }: MeetEditFormProps) => {
  const { t } = useTranslate()
  const transcriptionEnabled = useWatch({ control: meetEditForm.control, name: 'transcription' })

  const styles = useMemo(() => meetEditFormStyles(), [])

  return (
    <meetEditForm.Form className={styles.form()} onSubmit={onSubmit}>
      <Controller
        name='name'
        control={meetEditForm.control}
        render={({ field, fieldState: { error } }) => (
          <CustomInput
            {...field}
            label={t('meet_create.fields.name')}
            labelPlacement='outside'
            placeholder=' '
            isInvalid={!!error}
            color='default'
            errorMessage={error?.message}
            data-testid='meet-create-name-input'
          />
        )}
      />

      <Controller
        name='storageConfig'
        control={meetEditForm.control}
        render={({ field, fieldState: { error } }) => (
          <CustomInput
            label={t('meet_create.fields.storage_config') + '*'}
            labelPlacement='outside'
            placeholder={t('meet_create.placeholders.select_storage')}
            value={field.value?.name || ''}
            isDisabled
            isInvalid={!!error}
            errorMessage={error?.message}
            data-testid='meet-create-storage-select'
          />
        )}
      />
      <MeetEditServiceOptions transcriptionEnabled={!!transcriptionEnabled} />

      <div className={styles.buttonsContainer()}>
        <CustomButton
          color='default'
          onPress={onCancel}
          data-testid='meet-create-cancel-button'
          isDisabled={isLoading}
          className={styles.cancelButton()}
        >
          {t('meet_create.buttons.cancel')}
        </CustomButton>
        <CustomButton
          color='primary'
          type='submit'
          data-testid='meet-create-submit-button'
          isLoading={isLoading}
          isDisabled={isLoading}
          className={styles.submitButton()}
        >
          <span className={styles.submitButtonText()}>{t('meet_create.buttons.save')}</span>
        </CustomButton>
      </div>
    </meetEditForm.Form>
  )
}
