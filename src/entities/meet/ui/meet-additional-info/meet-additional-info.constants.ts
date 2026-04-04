export const MEET_ADDITIONAL_INFO_TEST_IDS = {
  ACCORDION: 'meet-show-additional-info-accordion',
  TABLE: 'meet-show-additional-info-table',
  GET_ROW: (index: number) => `meet-show-additional-info-row-${index}`,
  GET_SWITCH: (index: number) => `meet-show-additional-info-switch-${index}`,
} as const
