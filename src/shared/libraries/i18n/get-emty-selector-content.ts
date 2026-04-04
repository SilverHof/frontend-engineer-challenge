import i18next from 'i18next'

export const getEmptySelectorContent = (isError: boolean) => {
  if (isError) return i18next.t('common.error_loading_data')
  return i18next.t('common.no_items')
}
