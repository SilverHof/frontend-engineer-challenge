import { useMemo } from 'react'
import { Spinner, useDisclosure } from '@ant-core/ui'
import { ChevronLeft, ListCollapse, Mic, Pencil, Trash2 } from 'lucide-react'

import { routes } from '@/entities/__routes__'
import { MeetStatus } from '@/entities/meet'

import { MeetJsonldMeetReadCollectionStatusEnum as MeetStatusEnumKey } from '@/shared/__api__'
import { useTranslate } from '@/shared/libraries/i18n'
import { useAction } from '@/shared/libraries/reatom'
import { ConfirmModal, CustomButton } from '@/shared/ui'

import { meetShowHeaderVariants } from './meet-show-header.variants'

export type MeetShowHeaderProps = {
  status?: MeetStatusEnumKey | null
  isLoadingTranscription?: boolean
  isLoadingSummarization?: boolean
  onEdit?: () => void
  onDelete?: () => Promise<unknown>
  onTranscribe?: () => void
  onSummarize?: () => void
}

export const MeetShowHeader = (props: MeetShowHeaderProps) => {
  const { t } = useTranslate()
  const deleteModal = useDisclosure()
  const styles = useMemo(() => meetShowHeaderVariants(), [])

  const goToMeetsList = useAction(routes.meetList.go)

  const handleConfirmDelete = async () => {
    if (props.onDelete) await props.onDelete()
  }

  const canTranscribe = props.status === 'COMPLETED' || props.status === 'TRANSCRIBE_ERROR'

  const canSummarize =
    props.status === 'TRANSCRIBE_COMPLETED' || props.status === 'SUMMARY_ERROR' || props.status === 'SUMMARY_COMPLETED'

  return (
    <>
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onOpenChange={deleteModal.onOpenChange}
        title={t('meets.deleteSingleModal.title')}
        message={t('meets.deleteSingleModal.message')}
        isLoadingConfirm={false}
        onConfirmLabel={t('common.delete')}
        onCancelLabel={t('common.cancel')}
        onConfirm={handleConfirmDelete}
      />
      <CustomButton
        variant='light'
        onPress={goToMeetsList}
        data-testid='meet-show-back-button'
        className={styles.backButton()}
      >
        <ChevronLeft className={styles.backButtonIcon()} />
        <span className={styles.backButtonText()}>{t('meets.show.backToList')}</span>
      </CustomButton>
      <div className={styles.headerRow()}>
        <div className={styles.titleGroup()}>
          <h1 className={styles.title()}>{t('meets.show.title')}</h1>
          {!props.status && <Spinner size='sm' />}
          {props.status && <MeetStatus status={props.status as MeetStatusEnumKey} />}
        </div>
        <div className={styles.actionsGroup()}>
          {canTranscribe && props.onTranscribe && (
            <CustomButton
              color='default'
              onPress={props.onTranscribe}
              className={styles.actionButton()}
              data-testid='meet-show-transcribe-button'
              isLoading={props.isLoadingTranscription}
              isDisabled={props.isLoadingTranscription}
            >
              <Mic className={styles.actionButtonIcon()} />
              {t('meets.show.transcribeButton')}
            </CustomButton>
          )}
          {canSummarize && props.onSummarize && (
            <CustomButton
              color='default'
              className={styles.actionButton()}
              onPress={props.onSummarize}
              isLoading={props.isLoadingSummarization}
              isDisabled={props.isLoadingSummarization}
              data-testid='meet-show-summarize-button'
            >
              <ListCollapse className={styles.actionButtonIcon()} />
              {t('meets.show.summarizeButton')}
            </CustomButton>
          )}
          <CustomButton className={styles.actionButton()} onPress={props.onEdit} data-testid='meet-show-edit-button'>
            <Pencil className={styles.actionButtonIcon()} />
            {t('common.edit')}
          </CustomButton>
          <CustomButton
            color='danger'
            className={styles.deleteButton()}
            onPress={deleteModal.onOpen}
            data-testid='meet-show-delete-button'
          >
            <Trash2 className={styles.deleteButtonIcon()} />
            <span className={styles.deleteButtonText()}>{t('common.delete')}</span>
          </CustomButton>
        </div>
      </div>
    </>
  )
}
