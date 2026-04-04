import { useCallback, useMemo } from 'react'
import { urlAtom } from '@reatom/core'
import { TabItem, TabsRoot } from '@ant-core/ui'
import { Info, ListCollapse, Mic } from 'lucide-react'

import { MEET_SHOW_TABS } from '@/entities/meet'

import { useTranslate } from '@/shared/libraries/i18n'
import { useAtom } from '@/shared/libraries/reatom'
import { TabTitle } from '@/shared/ui'

type MeetShowTabsKey = (typeof MEET_SHOW_TABS)[keyof typeof MEET_SHOW_TABS]

export const MeetShowTabs = () => {
  const { t } = useTranslate()

  const [url] = useAtom(urlAtom)

  // Определяем выбранный таб из URL hash
  const selectedTab = useMemo<MeetShowTabsKey>(() => {
    const currentHash = url.hash as MeetShowTabsKey
    if (
      currentHash === MEET_SHOW_TABS.INFO ||
      currentHash === MEET_SHOW_TABS.TRANSCRIPTION ||
      currentHash === MEET_SHOW_TABS.SUMMARIZATION
    ) {
      return currentHash
    }
    return MEET_SHOW_TABS.INFO
  }, [url.hash])

  // Обработчик изменения таба - обновляет URL hash
  const handleTabChange = useCallback((key: React.Key) => {
    const tabHash = key as MeetShowTabsKey
    window.location.hash = tabHash
  }, [])

  const isActiveTab = useCallback(
    (tabName: MeetShowTabsKey) => {
      if (!url.hash && tabName === MEET_SHOW_TABS.INFO) return true
      return url.hash === tabName
    },
    [url.hash]
  )

  return (
    <div className=''>
      <TabsRoot
        variant='solid'
        color='primary'
        classNames={{ tabList: 'bg-primary-100 text-white' }}
        destroyInactiveTabPanel={false}
        selectedKey={selectedTab}
        onSelectionChange={handleTabChange}
        data-testid='meet-show-tabs'
      >
        <TabItem
          key={MEET_SHOW_TABS.INFO}
          title={
            <TabTitle
              title={t('meets.show.tabs.info')}
              isActive={isActiveTab(MEET_SHOW_TABS.INFO)}
              icon={<Info className='h-5 w-5' />}
              data-testid='meet-show-tab-info-title'
            />
          }
          data-testid='meet-show-tab-info'
        />
        <TabItem
          key={MEET_SHOW_TABS.TRANSCRIPTION}
          title={
            <TabTitle
              title={t('meets.show.tabs.transcription')}
              isActive={isActiveTab(MEET_SHOW_TABS.TRANSCRIPTION)}
              icon={<Mic className='h-5 w-5' />}
              data-testid='meet-show-tab-transcription-title'
            />
          }
          data-testid='meet-show-tab-transcription'
        />
        <TabItem
          key={MEET_SHOW_TABS.SUMMARIZATION}
          title={
            <TabTitle
              title={t('meets.show.tabs.summarization')}
              isActive={isActiveTab(MEET_SHOW_TABS.SUMMARIZATION)}
              icon={<ListCollapse className='h-5 w-5' />}
              data-testid='meet-show-tab-summarization-title'
            />
          }
          data-testid='meet-show-tab-summarization'
        />
      </TabsRoot>
    </div>
  )
}
