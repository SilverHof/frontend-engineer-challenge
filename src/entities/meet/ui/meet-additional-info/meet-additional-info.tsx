import { useMemo } from 'react'
import { AccordionItem, AccordionRoot, Switch } from '@ant-core/ui'

import { MeetJsonldMeetReadItem } from '@/shared/__api__'
import { useTranslate } from '@/shared/libraries/i18n'

import { MEET_ADDITIONAL_INFO_TEST_IDS } from './meet-additional-info.constants'
import { meetAdditionalInfoVariants } from './meet-additional-info.variants'

interface MeetAdditionalInfoProps {
  meetById?: MeetJsonldMeetReadItem
}

export const MeetAdditionalInfo = ({ meetById }: MeetAdditionalInfoProps) => {
  const { t } = useTranslate()
  const styles = useMemo(() => meetAdditionalInfoVariants(), [])

  const additionalInfoRows = [
    {
      label: t('meets.show.additionalInfo.integration'),
      value: meetById?.integration?.name || t('meets.show.noValue'),
      highlighted: true,
    },
    {
      label: t('meets.show.additionalInfo.recorderService'),
      value: meetById?.recorderConfig?.name || t('meets.show.noValue'),
    },
    {
      label: t('meets.show.additionalInfo.storage'),
      value: meetById?.storageConfig?.name || t('meets.show.noValue'),
      highlighted: true,
    },
    {
      label: t('meets.show.additionalInfo.transcription'),
      isSwitch: true,
      checked: meetById?.transcription ?? false,
    },
    {
      label: t('meets.show.additionalInfo.summarization'),
      isSwitch: true,
      checked: meetById?.summarization ?? false,
      highlighted: true,
    },
  ]

  return (
    <div className={styles.wrapper()}>
      <AccordionRoot>
        <AccordionItem
          key='additional-info'
          aria-label={t('meets.show.additionalInfo.title')}
          title={<span className={styles.accordionTitle()}>{t('meets.show.additionalInfo.title')}</span>}
          data-testid={MEET_ADDITIONAL_INFO_TEST_IDS.ACCORDION}
        >
          <div className={styles.card()} data-testid={MEET_ADDITIONAL_INFO_TEST_IDS.TABLE}>
            <div className={styles.container()}>
              {additionalInfoRows.map((row, index) => (
                <div
                  key={index}
                  className={row.highlighted ? styles.rowHighlighted() : styles.row()}
                  data-testid={MEET_ADDITIONAL_INFO_TEST_IDS.GET_ROW(index)}
                >
                  <div className={styles.rowLabel()}>{row.label}</div>
                  <div className={styles.rowValue()}>
                    {row.isSwitch ? (
                      <Switch
                        isSelected={row.checked}
                        isDisabled
                        size='sm'
                        data-testid={MEET_ADDITIONAL_INFO_TEST_IDS.GET_SWITCH(index)}
                        classNames={{
                          thumb: '!bg-default-400 group-data-[selected=true]:!bg-white',
                        }}
                      />
                    ) : (
                      <span className={styles.valueText()}>{row.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AccordionItem>
      </AccordionRoot>
    </div>
  )
}
