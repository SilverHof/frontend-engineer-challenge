import { useMemo } from 'react'

import { useTranslation } from 'react-i18next'

import { DownloadDropdownActions } from '@/features/download-dropdown-actions'
import { Summarization } from '@/features/summarization'

import { MEET_SUMMARY_RESULT_TEST_IDS, meetRequests } from '@/entities/meet'

import { MeetJsonldMeetReadItem } from '@/shared/__api__'
import { fileSave } from '@/shared/helpers'
import { toastError, useAction, useAsyncActionAtom } from '@/shared/libraries/reatom'

import { meetSummaryResultStyles } from './meet-summary-result.styles'

export type MeetSummaryResultProps = {
  meetById?: MeetJsonldMeetReadItem
}

export const MeetSummaryResult = (props: MeetSummaryResultProps) => {
  const { t } = useTranslation()
  const styles = useMemo(() => meetSummaryResultStyles(), [])

  const [downloadSummaryTxt, downloadSummaryMd, downloadSummaryDocx] = [
    useAsyncActionAtom(meetRequests.downloadSummaryTxt),
    useAsyncActionAtom(meetRequests.downloadSummaryMd),
    useAsyncActionAtom(meetRequests.downloadSummaryDocx),
  ]

  const onDownloadSummary = useAction(async (meetId: string, extension: string) => {
    const downloadRequest: Record<typeof extension, (id: string) => Promise<unknown>> = {
      txt: meetRequests.downloadSummaryTxt,
      docx: meetRequests.downloadSummaryDocx,
      md: meetRequests.downloadSummaryMd,
    }

    try {
      const result = await downloadRequest[extension](meetId)
      fileSave(result, 'summary', extension)
    } catch (error) {
      toastError(error)
    }
  }, [])

  const isLoading = downloadSummaryTxt.isLoading || downloadSummaryMd.isLoading || downloadSummaryDocx.isLoading
  const isDisabled = props?.meetById?.status !== 'SUMMARY_COMPLETED'

  return (
    <div className={styles.container()} data-testid={MEET_SUMMARY_RESULT_TEST_IDS.CONTAINER}>
      <div className={styles.header()} data-testid={MEET_SUMMARY_RESULT_TEST_IDS.HEADER}>
        <h2 className={styles.title()} data-testid={MEET_SUMMARY_RESULT_TEST_IDS.TITLE}>
          {t('meets.summary_result')}
        </h2>
        <DownloadDropdownActions
          downloadText={props?.meetById?.summaryResult}
          isDisabled={isDisabled}
          isLoading={isLoading}
          onDownloadTxt={() => onDownloadSummary(props.meetById?.id || '', 'txt')}
          onDownloadDocx={() => onDownloadSummary(props.meetById?.id || '', 'docx')}
          onDownloadMd={() => onDownloadSummary(props.meetById?.id || '', 'md')}
        />
      </div>
      <Summarization
        text={props?.meetById?.summaryResult || ''}
        isProcessing={props?.meetById?.status === 'SUMMARY'}
        isError={props?.meetById?.status === 'SUMMARY_ERROR'}
        processingText='meets.summarization_in_progress.title'
        errorText='meets.summarization_error.title'
        emptyText='meets.summarization_not_available.title'
        transcriptionErrorText='meets.transcription_not_available_for_summarization.title'
        transcriptionNotAvailable={!props?.meetById?.transcriptionResult}
      />
    </div>
  )
}
