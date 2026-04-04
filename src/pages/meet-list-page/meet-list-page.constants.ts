// Константы для meet-list-page компонента
export const MEET_LIST_PAGE_TEST_IDS = {
  DELETE_SELECTED_BUTTON: 'meets-delete-selected-button',
  CREATE_BUTTON: 'meets-create-button',
  COPY_URL_BUTTON: (meetId: string) => `meet-copy-url-button-${meetId}`,
  EDIT_BUTTON: (meetId: string) => `meet-edit-button-${meetId}`,
  DELETE_BUTTON: (meetId: string) => `meet-delete-button-${meetId}`,
} as const
