import { useMemo } from 'react'

import { useTranslation } from 'react-i18next'

import { DownloadDropdownActions } from '@/features/download-dropdown-actions'
import { Transcription, transcriptionToText } from '@/features/transcription'

import { MEET_TRANSCRIBE_RESULT_TEST_IDS, meetRequests } from '@/entities/meet'

import { MeetJsonldMeetReadItem } from '@/shared/__api__'
import { fileSave } from '@/shared/helpers'
import { toastError, useAction, useAsyncActionAtom } from '@/shared/libraries/reatom'

import { meetTranscribeResultStyles } from './meet-transcribe-result.styles'

export type MeetTranscribeResultProps = {
  meetById?: MeetJsonldMeetReadItem
}

export const MeetTranscribeResult = (props: MeetTranscribeResultProps) => {
  const { t } = useTranslation()
  const styles = useMemo(() => meetTranscribeResultStyles(), [])

  const [downloadTranscriptionTxt, downloadTranscriptionMd, downloadTranscriptionDocx] = [
    useAsyncActionAtom(meetRequests.downloadTranscriptionTxt),
    useAsyncActionAtom(meetRequests.downloadTranscriptionMd),
    useAsyncActionAtom(meetRequests.downloadTranscriptionDocx),
  ]

  const onDownloadTranscription = useAction(async (meetId: string, extension: string) => {
    const downloadRequest: Record<typeof extension, (id: string) => Promise<unknown>> = {
      txt: meetRequests.downloadTranscriptionTxt,
      docx: meetRequests.downloadTranscriptionDocx,
      md: meetRequests.downloadTranscriptionMd,
    }

    try {
      const result = await downloadRequest[extension](meetId)
      fileSave(result, 'transcription', extension)
    } catch (error) {
      toastError(error)
    }
  }, [])

  const isLoading =
    downloadTranscriptionTxt.isLoading || downloadTranscriptionMd.isLoading || downloadTranscriptionDocx.isLoading

  const isDisabled =
    props.meetById?.status === 'FOUND' ||
    props.meetById?.status === 'PREPARING' ||
    props.meetById?.status === 'TIME_CHANGED' ||
    props.meetById?.status === 'RECORDING' ||
    props.meetById?.status === 'RECORDING_PAUSED' ||
    props.meetById?.status === 'RECORDING_COMPLETED' ||
    props.meetById?.status === 'UPLOADING' ||
    props.meetById?.status === 'POSTPROCESSING' ||
    props.meetById?.status === 'EXTERNAL_UPLOAD' ||
    props.meetById?.status === 'COMPLETED' ||
    props.meetById?.status === 'ERROR' ||
    props.meetById?.status === 'TRANSCRIBE' ||
    props.meetById?.status === 'TRANSCRIBE_ERROR'

  return (
    <div className={styles.container()} data-testid={MEET_TRANSCRIBE_RESULT_TEST_IDS.CONTAINER}>
      <div className={styles.header()} data-testid={MEET_TRANSCRIBE_RESULT_TEST_IDS.HEADER}>
        <h2 className={styles.title()} data-testid={MEET_TRANSCRIBE_RESULT_TEST_IDS.TITLE}>
          {t('meets.transcription_result')}
        </h2>
        <DownloadDropdownActions
          isDisabled={isDisabled}
          isLoading={isLoading}
          downloadText={transcriptionToText(props.meetById?.transcriptionResult || '')}
          onDownloadTxt={() => onDownloadTranscription(props.meetById?.id || '', 'txt')}
          onDownloadDocx={() => onDownloadTranscription(props.meetById?.id || '', 'docx')}
          onDownloadMd={() => onDownloadTranscription(props.meetById?.id || '', 'md')}
        />
      </div>
      <Transcription
        transcriptionResult={props.meetById?.transcriptionResult}
        isProcessing={props.meetById?.status === 'TRANSCRIBE'}
        isError={props.meetById?.status === 'TRANSCRIBE_ERROR'}
        processingText='meets.transcription_in_progress.title'
        errorText='meets.transcription_error.title'
        emptyText='meets.transcription_not_available.title'
      />
    </div>
  )
}
