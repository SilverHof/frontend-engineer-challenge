export interface MeetUser {
  email: string
}

export interface MeetRecorderConfig {
  name: string
}

export interface MeetStorageConfig {
  name: string
}

export interface Meet {
  id?: string
  name: string
  meetStartAt: string
  meetEndAt: string
  url: string
  status: string
  user: MeetUser
  recorderConfig: MeetRecorderConfig
  storageConfig: MeetStorageConfig
  transcription: boolean
  summarization: boolean
}

export interface CreateMeetRequest {
  url: string
  recorderConfig: string // IRI
  storageConfig: string // IRI
  meetStartAt: string
  meetEndAt: string
  transcription: boolean
  summarization: boolean
  name?: string
}
