import { useMemo } from 'react'
import { Trash2 } from 'lucide-react'

import { useTranslate } from '@/shared/libraries/i18n'
import { CustomButton } from '@/shared/ui'

import { meetEditHeaderStyles } from './meet-edit-header.styles'

export interface MeetEditHeaderProps {
  onDelete: () => void
  isLoading: boolean
}

export const MeetEditHeader = (props: MeetEditHeaderProps) => {
  const { t } = useTranslate()
  const styles = useMemo(() => meetEditHeaderStyles(), [])

  return (
    <div className={styles.container()}>
      <h1 className={styles.title()}>{t('meet_edit.title')}</h1>
      <CustomButton
        color='danger'
        className={styles.deleteButton()}
        data-testid='meet-show-delete-button'
        onPress={props.onDelete}
        isDisabled={props.isLoading}
        isLoading={props.isLoading}
      >
        <Trash2 className={styles.deleteButtonIcon()} />
        <span className={styles.deleteButtonText()}>{t('meet_edit.delete')}</span>
      </CustomButton>
    </div>
  )
}
