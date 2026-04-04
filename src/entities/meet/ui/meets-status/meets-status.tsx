import { useMemo } from 'react'
import { Chip, ChipProps } from '@ant-core/ui'

import { Nullable } from '@/shared/@types'
import { MeetJsonldMeetReadCollectionStatusEnum as MeetStatusEnumKey } from '@/shared/__api__'
import { useTranslate } from '@/shared/libraries/i18n'

export interface MeetStatusProps {
  status?: Nullable<MeetStatusEnumKey>
}

export const MeetStatus = (props: MeetStatusProps) => {
  const { t } = useTranslate()

  const getMeetStatusColor = useMemo(() => {
    const color: Record<MeetStatusEnumKey, ChipProps['color']> = {
      FOUND: 'warning',
      PREPARING: 'primary',
      TIME_CHANGED: 'warning',
      RECORDING: 'warning',
      RECORDING_PAUSED: 'danger',
      RECORDING_COMPLETED: 'success',
      UPLOADING: 'primary',
      POSTPROCESSING: 'warning',
      EXTERNAL_UPLOAD: 'primary',
      COMPLETED: 'success',
      ERROR: 'danger',
      TRANSCRIBE: 'warning',
      TRANSCRIBE_COMPLETED: 'success',
      TRANSCRIBE_ERROR: 'danger',
      SUMMARY: 'warning',
      SUMMARY_COMPLETED: 'success',
      SUMMARY_ERROR: 'danger',
    }
    return (status: Nullable<MeetStatusEnumKey>) => {
      if (!status) {
        return 'default'
      }
      return color[status] || 'default'
    }
  }, [])

  const isPrimary = props.status === 'PREPARING' || props.status === 'UPLOADING' || props.status === 'EXTERNAL_UPLOAD'

  return (
    <Chip
      color={getMeetStatusColor(props.status || 'FOUND')}
      size='sm'
      variant='flat'
      {...(isPrimary
        ? { classNames: { content: 'text-info bg-info-100 font-font-medium', base: 'bg-info-100 h-7' } }
        : { classNames: { content: 'font-font-medium', base: 'h-7' } })}
    >
      {t(`meets.statuses.${props.status || 'FOUND'}`)}
    </Chip>
  )
}
