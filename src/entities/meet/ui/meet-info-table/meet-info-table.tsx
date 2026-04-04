import { useMemo } from 'react'
import { Link } from '@ant-core/ui'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

import { MeetJsonldMeetReadItem } from '@/shared/__api__'
import { DATE_TIME_SPACE_FORMAT } from '@/shared/constants'
import { calculateDuration } from '@/shared/helpers'
import { useTranslate } from '@/shared/libraries/i18n'

import { meetInfoTableVariants } from './meet-info-table.variants'

dayjs.extend(duration)

interface MeetInfoTableProps {
  meetById?: MeetJsonldMeetReadItem
}

interface InfoTableRow {
  label: string
  value: string | undefined | null
  isLink?: boolean
  highlighted?: boolean
}

export const MeetInfoTable = ({ meetById }: MeetInfoTableProps) => {
  const { t } = useTranslate()
  const styles = useMemo(() => meetInfoTableVariants(), [])

  const infoTableRows: InfoTableRow[] = [
    {
      label: t('meets.show.fields.name'),
      value: meetById?.name || t('meets.show.noValue'),
      highlighted: true,
    },
    {
      label: t('meets.show.fields.author'),
      value: meetById?.user?.email || t('meets.show.noValue'),
    },
    {
      label: t('meets.show.fields.start'),
      value: meetById?.meetStartAt
        ? dayjs(meetById.meetStartAt).format(DATE_TIME_SPACE_FORMAT)
        : t('meets.show.noValue'),
      highlighted: true,
    },
    {
      label: t('meets.show.fields.end'),
      value: meetById?.meetEndAt ? dayjs(meetById.meetEndAt).format(DATE_TIME_SPACE_FORMAT) : t('meets.show.noValue'),
    },
    {
      label: t('meets.show.fields.duration'),
      value: calculateDuration(meetById?.duration || 0),
      highlighted: true,
    },
    {
      label: t('meets.show.fields.meetUrl'),
      value: meetById?.url,
      isLink: true,
    },
    {
      label: t('meets.show.fields.videoUrl'),
      value: meetById?.videoLinkResult,
      isLink: true,
      highlighted: true,
    },
  ]

  return (
    <div className={styles.card()} data-testid='meet-show-content'>
      <div className={styles.container()} data-testid='meet-show-info-table'>
        {infoTableRows.map((row, index) => (
          <div
            key={index}
            className={row.highlighted ? styles.rowHighlighted() : styles.row()}
            data-testid={`meet-show-info-row-${index}`}
          >
            <div className={styles.rowLabel()}>{row.label}</div>
            <div className={styles.rowValue()}>
              {row.isLink ? (
                row.value ? (
                  <Link href={row.value} isExternal className={styles.link()}>
                    {row.value}
                  </Link>
                ) : (
                  t('meets.show.noValue')
                )
              ) : (
                <span className='block truncate'>{row.value}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
