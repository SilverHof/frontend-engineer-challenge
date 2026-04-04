import { useCallback, useMemo, useState } from 'react'
import { Button, useDisclosure } from '@ant-core/ui'
import { Edit, Link as LinkIcon, Trash2 } from 'lucide-react'
import dayjs from 'dayjs'

import { ListLayout, ListLayoutColumn } from '@/widgets/list-layout'

import { routes } from '@/entities/__routes__'
import {
  meetItemsPerPageAtom,
  meetPageAtom,
  meetRequests,
  meetSelectedIdsAtom,
  MeetsListFilters,
  meetSortAtom,
  MeetStatus,
} from '@/entities/meet'

import { Nullable } from '@/shared/@types'
import { MeetJsonldMeetReadCollection } from '@/shared/__api__'
import { DEFAULT_DATE_FORMAT, TIME_FORMAT } from '@/shared/constants'
import { useTranslate } from '@/shared/libraries/i18n'
import { useAction, useAsyncActionAtom, useAsyncQueryAtom, useAtom } from '@/shared/libraries/reatom'
import { ConfirmModal, CustomButton, TableSort } from '@/shared/ui'

import { MEET_LIST_PAGE_TEST_IDS } from './meet-list-page.constants'

export const MeetListPage = () => {
  const { t } = useTranslate()
  const confirmModal = useDisclosure()

  const [meetId, setMeetId] = useState<Nullable<string>>(null)

  const [selectedMeetIds] = useAtom(meetSelectedIdsAtom)

  const [getMeets, deleteMeet, deleteMeetMass] = [
    useAsyncQueryAtom(meetRequests.getCollection),
    useAsyncActionAtom(meetRequests.delete),
    useAsyncActionAtom(meetRequests.deleteMass),
  ]

  const setSelectedMeetIds = useAction(meetSelectedIdsAtom.set)

  const goToMeetCreate = useAction(routes.meetCreate.go)

  const goToMeetsEdit = useAction((params: { meetId: string }) => {
    routes.meetEdit.go(params)
  }, [])

  const goToShow = useAction((params: { meetId: string }) => {
    routes.meetShow.go(params)
  }, [])

  const onResetData = useAction(() => {
    setMeetId(null)
    setSelectedMeetIds([])
    getMeets.refetch()
  }, [])

  const onDeleteMeet = useAction(async (meetId: string) => {
    await deleteMeet.mutate(meetId)
    onResetData()
  }, [])

  const onDeleteMeetMass = useAction(async (meetIds: string[]) => {
    await deleteMeetMass.mutate({ meetIds })
    onResetData()
  }, [])

  const meetsColumns = useMemo<ListLayoutColumn[]>(
    () => [
      // Колонка #1: Название
      {
        key: 'name',
        labelComponent: (
          <TableSort field='name' sortAtom={meetSortAtom}>
            {t('meets.columns.name')}
          </TableSort>
        ),
        width: '35%',
      },
      // Колонка #2: Статус
      {
        key: 'status',
        labelComponent: (
          <TableSort field='status' sortAtom={meetSortAtom}>
            {t('meets.columns.status')}
          </TableSort>
        ),
        width: '15%',
      },
      // Колонка #3: Начало
      {
        key: 'meetStartAt',
        labelComponent: (
          <TableSort field='meetStartAt' sortAtom={meetSortAtom}>
            {t('meets.columns.start')}
          </TableSort>
        ),
        width: '15%',
      },
      // Колонка #4: Конец
      {
        key: 'meetEndAt',
        labelComponent: (
          <TableSort field='meetEndAt' sortAtom={meetSortAtom}>
            {t('meets.columns.end')}
          </TableSort>
        ),
        width: '15%',
      },
      // Колонка #5: Действия
      { key: 'action', labelComponent: '', width: '15%' },
    ],
    [meetSortAtom, t]
  )

  const getMeetRowCells = useCallback(
    (meet: MeetJsonldMeetReadCollection) => [
      // Ячейка #1: Название
      <span>{meet.name}</span>,
      // Ячейка #2: Статус
      <MeetStatus status={meet.status} />,
      // Ячейка #3: Начало
      <div className='flex gap-2'>
        {meet.meetStartAt ? (
          <>
            <span>{dayjs(meet.meetStartAt).format(DEFAULT_DATE_FORMAT)}</span>
            <span>{dayjs(meet.meetStartAt).format(TIME_FORMAT)}</span>
          </>
        ) : (
          <span>-</span>
        )}
      </div>,
      // Ячейка #4: Конец
      <div className='flex gap-2'>
        {meet.meetEndAt ? (
          <>
            <span>{dayjs(meet.meetEndAt).format(DEFAULT_DATE_FORMAT)}</span>
            <span>{dayjs(meet.meetEndAt).format(TIME_FORMAT)}</span>
          </>
        ) : (
          <span>-</span>
        )}
      </div>,
      // Ячейка #5: Кнопки действий
      <div className='flex justify-end gap-2'>
        <CustomButton
          color='default'
          isIconOnly
          data-testid={MEET_LIST_PAGE_TEST_IDS.COPY_URL_BUTTON(meet.id as string)}
          onPress={() => {
            if (meet.url) {
              navigator.clipboard.writeText(meet.url)
            }
          }}
        >
          <LinkIcon className='text-default-400 h-4 w-4' />
        </CustomButton>
        <CustomButton
          color='default'
          isIconOnly
          data-testid={MEET_LIST_PAGE_TEST_IDS.EDIT_BUTTON(meet.id as string)}
          onPress={() => goToMeetsEdit({ meetId: meet.id as string })}
        >
          <Edit className='text-default-400 h-4 w-4' />
        </CustomButton>
        <Button
          color='default'
          isIconOnly
          className='bg-danger-100'
          onPress={() => [confirmModal.onOpenChange(), setMeetId(meet.id as string)]}
          data-testid={MEET_LIST_PAGE_TEST_IDS.DELETE_BUTTON(meet.id as string)}
        >
          <Trash2 className='h-4 w-4 text-red-500' />
        </Button>
      </div>,
    ],
    [t]
  )

  return (
    <>
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onOpenChange={confirmModal.onOpenChange}
        title={t('meets.deleteModal.title')}
        message={t('meets.deleteModal.message')}
        isLoadingConfirm={deleteMeet.isLoading || deleteMeetMass.isLoading}
        onConfirmLabel={t('common.delete')}
        onCancelLabel={t('common.cancel')}
        onConfirm={meetId ? () => onDeleteMeet(meetId) : () => onDeleteMeetMass(selectedMeetIds)}
      />
      <ListLayout<MeetJsonldMeetReadCollection>
        title={t('meets.title')}
        type='with-actions'
        items={getMeets?.data?.member ?? []}
        totalItems={getMeets?.data?.totalItems ?? 0}
        isLoading={getMeets.isLoading}
        filtersComponent={<MeetsListFilters />}
        topActionsComponent={
          <div className='flex w-fit gap-2'>
            {selectedMeetIds.length > 0 && (
              <Button
                color='danger'
                variant='light'
                className='bg-danger-100 font-semibold'
                data-testid={MEET_LIST_PAGE_TEST_IDS.DELETE_SELECTED_BUTTON}
                onPress={confirmModal.onOpenChange}
                isDisabled={selectedMeetIds.length === 0}
              >
                <Trash2 className='text-danger h-4 w-4' />
                {t('common.deleteSelected')}
              </Button>
            )}
            <CustomButton
              color='primary'
              variant='solid'
              data-testid={MEET_LIST_PAGE_TEST_IDS.CREATE_BUTTON}
              onPress={goToMeetCreate}
            >
              <span className='font-semibold text-white'>{t('meets.add')}</span>
            </CustomButton>
          </div>
        }
        columns={meetsColumns}
        rowCells={getMeetRowCells}
        onRowNavigate={(meet) => {
          goToShow({ meetId: meet.id as string })
        }}
        atoms={{
          page: meetPageAtom,
          perPage: meetItemsPerPageAtom,
          selectedKeys: meetSelectedIdsAtom,
        }}
      />
    </>
  )
}
