import { useEffect } from 'react'
import { Button, SelectItem } from '@ant-core/ui'
import { RefreshCcw } from 'lucide-react'
import { Controller, useFormContext } from 'react-hook-form'

import { storageConfigRequests } from '@/entities/storage-config'

import { getEmptySelectorContent, useTranslate } from '@/shared/libraries/i18n'
import { useAsyncQueryAtom } from '@/shared/libraries/reatom'
import { CustomInput, CustomSelectRoot } from '@/shared/ui'

export const MeetEditFormFields = () => {
  const { t } = useTranslate()
  const { control, getValues, setValue } = useFormContext()
  const storageConfigsQuery = useAsyncQueryAtom(storageConfigRequests.getCollection)
  const storage_data = storageConfigsQuery.data?.member || []

  useEffect(() => {
    if ((storageConfigsQuery.data?.member || [])?.length > 0 && !getValues('storageConfig')) {
      const globalConfig = (storageConfigsQuery.data?.member || []).find((config) => config.isGlobal)
      if (globalConfig) {
        setValue('storageConfig', globalConfig['@id'])
      }
    }
  }, [storageConfigsQuery.data, setValue, getValues])

  return (
    <>
      <Controller
        name='name'
        control={control}
        render={({ field, fieldState: { error } }) => (
          <CustomInput
            {...field}
            label={t('meet_create.fields.name')}
            labelPlacement='outside'
            placeholder=' '
            isInvalid={!!error}
            color='default'
            errorMessage={error?.message}
            data-testid='meet-create-name-input'
          />
        )}
      />
      <Controller
        name='storageConfig'
        control={control}
        render={({ field, fieldState: { error } }) => (
          <CustomSelectRoot
            label={t('meet_create.fields.storage_config') + '*'}
            labelPlacement='outside'
            placeholder={t('meet_create.placeholders.select_storage')}
            selectedKeys={field.value ? new Set([field.value as string]) : new Set()}
            onSelectionChange={(keys) => {
              const value = Array.from(keys)[0] as string
              field.onChange(value)
            }}
            isDisabled
            isLoading={storageConfigsQuery.isLoading}
            disallowEmptySelection
            isInvalid={!!error}
            errorMessage={error?.message}
            data-testid='meet-create-storage-select'
            classNames={{
              endContent: 'w-7!',
              ...(!!error && { label: '!translate-y-[calc(-100%_-_0.4375rem_-_30px)]' }),
            }}
            listboxProps={{
              emptyContent: getEmptySelectorContent(storageConfigsQuery.isError),
            }}
            {...(storageConfigsQuery.isError && {
              endContent: (
                <Button
                  isIconOnly
                  isLoading={storageConfigsQuery.isLoading}
                  isDisabled={storageConfigsQuery.isLoading}
                  onPress={storageConfigsQuery.refetch}
                  className='w-[16px]! bg-transparent!'
                >
                  <RefreshCcw className='text-default-400! h-4 w-4' />
                </Button>
              ),
            })}
          >
            {storage_data.map((config) => (
              <SelectItem key={config['@id']} data-testid={`storage-option-${config['@id']}`}>
                {config.name}
              </SelectItem>
            ))}
          </CustomSelectRoot>
        )}
      />
    </>
  )
}
