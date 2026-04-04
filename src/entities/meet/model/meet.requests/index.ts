import { meetToSummarization } from '@/entities/meet/model/meet.requests/summarize-meet.ts'

import { createMeet } from './create-meet'
import { deleteMeet } from './delete-meet'
import { deleteMeetsMass } from './delete-meets'
import {
  downloadMeetSummary,
  downloadMeetSummaryDocx,
  downloadMeetSummaryMd,
  downloadMeetSummaryTxt,
} from './download-meet-summary.ts'
import {
  downloadMeetTranscribe,
  downloadMeetTranscribeDocx,
  downloadMeetTranscribeMd,
  downloadMeetTranscribeTxt,
} from './download-meet-transcribe.ts'
import { editMeet } from './edit-meet.ts'
import { getMeetById } from './get-meet-by-id'
import { getMeetsCollection } from './get-meets-collection'
import { meetToTranscription } from './transkribe-meet'

export * from './get-meets-collection'
export * from './create-meet'
export * from './get-meet-by-id'
export * from './delete-meets'
export * from './delete-meet'
export * from './summarize-meet'
export * from './transkribe-meet'
export * from './download-meet-transcribe'
export * from './download-meet-summary'

export const meetRequests = {
  getCollection: getMeetsCollection,
  create: createMeet,
  getById: getMeetById,
  delete: deleteMeet,
  deleteMass: deleteMeetsMass,
  toSummarization: meetToSummarization,
  toTranscription: meetToTranscription,
  downloadTranscribe: downloadMeetTranscribe,
  downloadTranscriptionTxt: downloadMeetTranscribeTxt,
  downloadTranscriptionDocx: downloadMeetTranscribeDocx,
  downloadTranscriptionMd: downloadMeetTranscribeMd,
  downloadSummary: downloadMeetSummary,
  downloadSummaryTxt: downloadMeetSummaryTxt,
  downloadSummaryDocx: downloadMeetSummaryDocx,
  downloadSummaryMd: downloadMeetSummaryMd,
  edit: editMeet,
} as const
